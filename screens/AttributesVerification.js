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
import {getDisplayName, getDisplayValue, toggleElementsInList,
  isAttributeEnabled, pickAttributes, getApiName, getApiValue} from "../lib/attributes";
import Logo from '../application/components/ScreenLogo/ScreenLogo';
import Button from '../application/components/Button/Button';
import {updateVerificationInput} from '../application/redux/actions/verification';
import { addCredential } from '../application/redux/actions/attributes';
import {goToPetitionSummary, goToError, goToNewAttributes} from "../application/redux/actions/navigation";
import CredentialIssuerClient from '../lib/CredentialIssuerClient';
import ZenroomExecutor from '../lib/ZenroomExecutor';
import isJson from '../lib/is-json';
import contract01 from '../assets/contracts/01-CITIZEN-credential-keygen.zencode';
import contract02 from '../assets/contracts/02-CITIZEN-credential-request.zencode';
import contract06 from '../assets/contracts/06-CITIZEN-aggregate-credential-signature.zencode';
import contract07 from '../assets/contracts/07-CITIZEN-prove-credential.zencode';
import contract50 from '../assets/contracts/50-MISC-hashing.zencode';
import Attribute from "../application/components/Attribute/Attribute";


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

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      enabledAttributes: [],
    };
  }

  toggleEnabledAttribute(attr) {
    this.setState({enabledAttributes: toggleElementsInList(attr, this.state.enabledAttributes)});
  }

  callCredentialIssuer = (data, optionalData, url, hash = true) => async () => {
    console.log("data: ", data);
    let hashedData = {...data};
    for (const k in hashedData) {
      hashedData[k] = hash ? await ZenroomExecutor.execute(contract50, data[k], '') : data[k];
    }
    console.log("hashedData: ", hashedData);
    console.log("optionalData: ", optionalData);
    let hashedOptionalData =  [];
    for (const k in optionalData) {
      const {name, value} = optionalData[k];
      if (this.state.enabledAttributes.find(({predicate}) => (predicate === name))) {
        hashedOptionalData[name] = hash ? await ZenroomExecutor.execute(contract50, value, '') : value;
      }
    }
    console.log("hashedOptionalData: ", hashedOptionalData);
    const {mandatoryAttributes, attributeId} = this.props;
    let credentialIssuer = new CredentialIssuerClient(url);
    try {

      // CONTRACT 01
      const uniqueId = uuid.create().toString();
      console.log("Going to execute contract01: ", contract01(uniqueId));
      const keypair = await ZenroomExecutor.execute(contract01(uniqueId), '', '');
      console.log("Response from contract01 (keypair): ", keypair);
      if (! isJson(keypair)) {
        this.props.goToError("Invalid response from contract 01");
        return;
      }
      const { [uniqueId]: {public: publicKey, private: privateKey}} = JSON.parse(keypair);

      // CONTRACT 02
      console.log("Going to execute contract02: ", contract02(uniqueId, mandatoryAttributes.map(a => a.object)));
      console.log("Keys: ", keypair);
      const blindSignatureReq = await ZenroomExecutor.execute(contract02(uniqueId, mandatoryAttributes.map(a => a.object)), '', keypair);
      console.log("Response from contract02 (blindSignatureReq): ", blindSignatureReq);
      if (! isJson(blindSignatureReq)) {
        this.props.goToError("Invalid response from contract 02");
        return;
      }

      // CALLS TO CREDENTIAL ISSUER
      const issuerId = await credentialIssuer.getIssuerId();
      console.log("Credential Issuer id: ", issuerId);

      const issuerVerifyKeypair = await credentialIssuer.getIssuerVerifier(attributeId);
      console.log("Issuer verify keypair (contract 04): ", issuerVerifyKeypair);

      const issuerSignedCredential = await credentialIssuer.issueCredential(
        attributeId,
        JSON.parse(blindSignatureReq),
        hashedData,
        hashedOptionalData,
      );
      console.log("Issuer signed credential (contract 05): ", issuerSignedCredential);


      // CONTRACT 06
      const c06 = contract06(uniqueId, issuerId);
      console.log("Going to execute contract 06: ", c06);
      console.log("Keys: ", keypair);
      console.log("Data: ", JSON.stringify(issuerSignedCredential));
      const credential = await ZenroomExecutor.execute(
        c06,
        JSON.stringify(issuerSignedCredential),
        keypair
      );
      console.log("Response from contract06", credential);

      // CONTRACT 07
      const c07 = contract07(uniqueId, issuerId, mandatoryAttributes.map(a => a.object));
      console.log("Going to execute contract 07: ", c07);
      console.log("Keys: ", credential);
      console.log("Data: ", JSON.stringify(issuerVerifyKeypair));
      const blindProofCredential = await ZenroomExecutor.execute(
        c07,
        JSON.stringify(issuerVerifyKeypair),
        credential
      );
      console.log("Response from contract07 (blindProofCredential):", blindProofCredential);

      await this.props.addCredential(mandatoryAttributes[0], uniqueId, issuerId, issuerVerifyKeypair, credential, blindProofCredential);
      this.props.goToPetitionSummary();

    } catch(error) {
      console.log('Error calling credential issuer: ', JSON.stringify(error));
      this.props.goToError(error.message);
    }
  }

  render() {
    const {t, mandatoryAttributes, attributes, verificationInput} = this.props;
    const {provenance: {url: credentialIssuerUrl}} = mandatoryAttributes[0];
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            {
              mandatoryAttributes[0].verificationInput.map(
                attr => (
                  <View key={attr.id} style={styles.verificationInputView}>
                    <Text>{getDisplayName(attr.id, t)}
                      <Text style={{ color: '#D0021B' }}> *</Text>
                    </Text>
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
          <View style={{flex: 1, paddingHorizontal: 20}}>
            {
              attributes.length ?
              attributes.map(
                attr => (
                  <Attribute
                    key={attr.predicate}
                    isMandatory={false}
                    isEnabled={isAttributeEnabled(attr, this.state.enabledAttributes)}
                    toggleCallback={() => this.toggleEnabledAttribute(attr)}
                    name={getDisplayName(attr.predicate, t)}
                    value={getDisplayValue(attr, t)}
                    requiredError="N/A"
                  />
                )
              ) : <Text style={{ fontSize: 20, color: '#a2a2a2', textAlign: 'center' }}>{t('emptyData')}</Text>
            }
          </View>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <Text
              style={styles.cancelSigningPetition}
              onPress={() => this.props.goToManageAttributes()}>
              {t('manageData')}
            </Text>
          </View>

        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Button
            name={t('verify')}
            onPress={this.callCredentialIssuer(
              verificationInput,
              attributes.map(({predicate, object}) => ({
                name: getApiName(predicate),
                value: getApiValue({predicate, object})})),
              credentialIssuerUrl)
            }
          />
        </View>
      </View>
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
  attributeId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  mandatoryAttributes: state.petition.petition.attributes.mandatory,
  verificationInput: state.verification,
  optionalAttributes: state.petition.petition.attributes.optional,
  attributes: pickAttributes(state.attributes.list),
  attributeId: state.petition.petition.attributeId,
});

const mapDispatchToProps = dispatch => ({
  updateVerificationInput: (id, value) => dispatch(updateVerificationInput(id, value)),
  goToPetitionSummary: () => dispatch(goToPetitionSummary()),
  goToError: message => dispatch(goToError(message)),
  goToManageAttributes: () => dispatch(goToNewAttributes()),
  addCredential: (attribute, uniqueId, issuerId, issuerVerifier, credential, blindProof) => {
    dispatch(addCredential(attribute, uniqueId, issuerId, issuerVerifier, credential, blindProof, SecureStore.setItemAsync));
  },
});

export default translate('attributesVerification', { i18n })(connect(mapStateToProps, mapDispatchToProps)(AttributesVerification));
