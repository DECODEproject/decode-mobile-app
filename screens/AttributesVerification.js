import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SecureStore } from 'expo';
import { Dimensions, ScrollView, View, Platform, Text, TextInput } from 'react-native';
import { translate } from 'react-i18next';
import styles from './styles';
import i18n from '../i18n';
import Logo from '../application/components/ScreenLogo/ScreenLogo';
import Button from '../application/components/Button/Button';
import {updateVerificationInput} from '../application/redux/actions/verification';
import { addCredential } from '../application/redux/actions/attributes';
import {goToPetitionSummary, goToError} from "../application/redux/actions/navigation";
import CredentialIssuerClient from '../lib/CredentialIssuerClient';
import ZenroomExecutor from '../lib/ZenroomExecutor';
import isJson from '../lib/is-json';
import contract01 from '../assets/contracts/01-CITIZEN-request-keypair.zencode';


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

  callCredentialIssuer = (data, url) => async () => {
    const {mandatoryAttributes, walletId} = this.props;
    let credentialIssuer = new CredentialIssuerClient(url);
    try {
      let {credential} = credentialIssuer.issueCredential(data);
      if (credential) {
        await this.props.addCredential(mandatoryAttributes[0], walletId, credential);
        const uniqueId = credential; // TODO: At this moment this is all what we have let's call it uniqueId
        console.log("Going to execute contract01");
        const contract01Response = await ZenroomExecutor.execute(contract01(uniqueId), '', '');
        console.log("Response from contract01", contract01Response);
        if (! isJson(contract01Response)) {
          console.log("Invalid response from contract 01", contract01Response);
          this.props.goToError();
          return;
        }
        const { [uniqueId]: {public: publicKey, private: privateKey}} = JSON.parse(contract01Response);
        console.log("Public key", publicKey);
        console.log("Private key", privateKey);
        this.props.goToPetitionSummary();
      } else {
        console.log("No credential returned");
        this.props.goToError();
      }
    } catch(error) {
      console.log('Error calling credential issuer: ', JSON.stringify(error));
      this.props.goToError();
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
                <View key={attr.name.en} style={styles.verificationInputView}>
                  <Text>{t(attr.name.en)}</Text>
                  <TextInput
                    style={styles.verificationInput}
                    value={verificationInput[attr.name.en]}
                    onChangeText={value => this.props.updateVerificationInput(attr.name.en, value)}
                  />
                </View>
              )
            )
          }
        </View>
        <Button
          name={t('verify')}
          onPress={this.callCredentialIssuer(verificationInput, credentialIssuerUrl)}
        />
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
  goToError: () => dispatch(goToError()),
  addCredential: (attribute, walletId, credential) => {
    dispatch(addCredential(attribute, walletId, credential, SecureStore.setItemAsync));
  },
});

export default translate('attributesVerification', { i18n })(connect(mapStateToProps, mapDispatchToProps)(AttributesVerification));
