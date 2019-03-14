/*
 * DECODE App – A mobile app to control your personal data
 * Copyright (C) 2019 – Thoughtworks Ltd.
 * Copyright (C) 2019 – DRIBIA Data Research S.L.
 *
 * DECODE App is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DECODE App is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * email: ula@dribia.com
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SecureStore } from 'expo';
import { Dimensions, ScrollView, View, Platform, Text, TextInput } from 'react-native';
import { translate } from 'react-i18next';
import uuid from 'uuid-js';
import styles from './styles';
import i18n from '../i18n';
import {getDisplayName} from "../lib/attributes";
import Logo from '../application/components/ScreenLogo/ScreenLogo';
import Button from '../application/components/Button/Button';
import {updateVerificationInput} from '../application/redux/actions/verification';
import { addCredential } from '../application/redux/actions/attributes';
import {goToPetitionSummary, goToError} from "../application/redux/actions/navigation";
import CredentialIssuerClient from '../lib/CredentialIssuerClient';
import ZenroomExecutor from '../lib/ZenroomExecutor';
import isJson from '../lib/is-json';
import contract01 from '../assets/contracts/01-CITIZEN-credential-keygen.zencode';
import contract02 from '../assets/contracts/02-CITIZEN-credential-request.zencode';
import contract06 from '../assets/contracts/06-CITIZEN-aggregate-credential-signature.zencode';
import contract07 from '../assets/contracts/07-CITIZEN-prove-credential.zencode';
import contract50 from '../assets/contracts/50-MISC-hashing.zencode';


class AttributesVerification extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
      borderBottomColor: 'white',
      elevation: 1,
      fontSize: 20,
      fontWeight: '500',
      tintColor: 'rgb(0,163,158)',
      renderTitle: () => <View  style={{marginLeft: Platform.OS === 'ios' ? -20 : -60,}} ><Logo/></View>,
      height: 80,
    },
  };

  callCredentialIssuer = (data, url, hash = true) => async () => {
    for (const k in data) {
      data[k] = hash ? await ZenroomExecutor.execute(contract50, data[k], '') : data[k];
    }
    console.log("data: ", data);
    const {mandatoryAttributes, walletId} = this.props;
    let credentialIssuer = new CredentialIssuerClient(url);
    try {

      // CONTRACT 01
      const uniqueId = uuid.create().toString();
      console.log("Going to execute contract01: ", contract01(uniqueId));
      const contract01Response = await ZenroomExecutor.execute(contract01(uniqueId), '', '');
      console.log("Response from contract01", contract01Response);
      if (! isJson(contract01Response)) {
        this.props.goToError("Invalid response from contract 01");
        return;
      }
      const { [uniqueId]: {public: publicKey, private: privateKey}} = JSON.parse(contract01Response);

      // CONTRACT 02
      console.log("Going to execute contract02: ", contract02(uniqueId, mandatoryAttributes.map(a => a.object)));
      const contract02Response = await ZenroomExecutor.execute(contract02(uniqueId, mandatoryAttributes.map(a => a.object)), '', contract01Response);
      console.log("Response from contract02", contract02Response);
      if (! isJson(contract02Response)) {
        this.props.goToError("Invalid response from contract 02");
        return;
      }
      const blindSignRequest = JSON.parse(contract02Response);

      // CALLS TO CREDENTIAL ISSUER
      const issuerId = await credentialIssuer.getIssuerId();
      console.log("Credential Issuer id: ", issuerId);

      const issuerSignedCredential = await credentialIssuer.issueCredential(mandatoryAttributes[0].predicate, blindSignRequest, data);
      console.log("Issuer signed credential: ", issuerSignedCredential);

      const issuerVerifier = await credentialIssuer.getIssuerVerifier(mandatoryAttributes[0].predicate);
      console.log("Issuer verifier: ", issuerVerifier);


      // CONTRACT 06
      // const c06 = contract06(uniqueId, issuerId);
      const c06 = contract06(uniqueId, 'issuer_identifier'); // TODO: This is a workaround
      console.log("Going to execute contract 06: ", c06);
      const contract06Response = await ZenroomExecutor.execute(c06, JSON.stringify(issuerSignedCredential), contract01Response);
      console.log("Response from contract06", contract06Response);

      // CONTRACT 07
      // const c07 = contract07(uniqueId, issuerId, mandatoryAttributes.map(a => a.object));
      const c07 = contract07(uniqueId, 'issuer_identifier', mandatoryAttributes.map(a => a.object)); // TODO: the workaround as above
      console.log("Going to execute contract 07: ", c07);
      const contract07Response = await ZenroomExecutor.execute(c07, JSON.stringify(issuerVerifier), contract06Response);
      console.log("Response from contract07", contract07Response);

      await this.props.addCredential(mandatoryAttributes[0], walletId, contract07Response);
      this.props.goToPetitionSummary();

    } catch(error) {
      console.log('Error calling credential issuer: ', JSON.stringify(error));
      this.props.goToError(error.message);
    }
  }

  render() {
    const {height: windowHeight} = Dimensions.get('window');
    const {t, mandatoryAttributes, verificationInput} = this.props;
    const {provenance: {url: credentialIssuerUrl}} = mandatoryAttributes[0];
    return (
      <ScrollView keyboardShouldPersistTaps="handled"
                  style={styles.petitionSummaryContainer}
                  contentContainerStyle={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: windowHeight-80,
        paddingBottom: 26,
      }}>
        <View>
          {
            mandatoryAttributes[0].verificationInput.map(
              attr => (
                <View key={attr.id} style={styles.verificationInputView}>
                  <Text>{getDisplayName(attr.id, t)}</Text>
                  <TextInput
                    style={styles.verificationInput}
                    value={verificationInput[attr.id]}
                    onChangeText={value => this.props.updateVerificationInput(attr.id, value)}
                  />
                </View>
              )
            )
          }
        </View>
        <View>
          <Button
            name={t('verify')}
            onPress={this.callCredentialIssuer(verificationInput, credentialIssuerUrl, false)}
          />
          <Button
            name={t('verifyHash')}
            onPress={this.callCredentialIssuer(verificationInput, credentialIssuerUrl)}
          />
        </View>
      </ScrollView>
    );
  }
}

AttributesVerification.propTypes = {
  t: PropTypes.func.isRequired,
  mandatoryAttributes: PropTypes.arrayOf(PropTypes.shape({
    provenance: PropTypes.shape({
      url: PropTypes.string,
    }),
    verificationInput: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.object,
      type: PropTypes.string,
      value: PropTypes.string,
    })),
  })),
  updateVerificationInput: PropTypes.func,
};

const mapStateToProps = state => ({
  mandatoryAttributes: state.petition.petition.attributes.mandatory,
  verificationInput: state.verification,
});

const mapDispatchToProps = dispatch => ({
  updateVerificationInput: (id, value) => dispatch(updateVerificationInput(id, value)),
  goToPetitionSummary: () => dispatch(goToPetitionSummary()),
  goToError: message => dispatch(goToError(message)),
  addCredential: (attribute, walletId, credential) => {
    dispatch(addCredential(attribute, walletId, credential, SecureStore.setItemAsync));
  },
});

export default translate('attributesVerification', { i18n })(connect(mapStateToProps, mapDispatchToProps)(AttributesVerification));