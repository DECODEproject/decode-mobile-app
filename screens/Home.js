import React from 'react';
import { connect } from 'react-redux';
import { Image, Text, TextInput, View, KeyboardAvoidingView, Keyboard } from 'react-native';
import { SecureStore, ScreenOrientation } from 'expo';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { goToAttributesLanding, goToAttributesSummary, goToPetitionSummary, goToError } from '../application/redux/actions/navigation';
import setDecidimInfo from '../application/redux/actions/decidimInfo';
import { getPetition } from '../application/redux/actions/petition';
import { loadCredentials } from '../application/redux/actions/attributes';
import setCredential from '../application/redux/actions/credentials';
import authorizationAction, { updatePin } from '../application/redux/actions/authorization';
import Button from '../application/components/Button/Button';
import i18n from '../i18n';


import styles from './styles';
import DecidimClient from '../lib/DecidimClient';
import LanguageService from '../lib/LanguageService';
import Attribute from '../lib/Attribute';

const decodeLogo = require('../assets/images/decode-hexagon.png');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.validatePinCode = this.validatePinCode.bind(this);
  }


  componentWillMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP);
    this.props.initializeState().then(() => {});
  }

  goToPetition() {
    const petition = this.props.getPetition(
      this.props.decidimClient,
      this.props.decidimAPIUrl,
      this.props.petitionId,
    );
    return petition.then(() => {
      const errorGettingPetitionInformation = this.props.petitionError !== undefined;
      if (errorGettingPetitionInformation) {
        this.props.goToError(this.props.t('errorTitle'), this.props.t('errorText'));
      } else {
        const isAttributeVerified = this.props.attributes.list.has('schema:addressLocality');
        if (isAttributeVerified) {
          this.props.goToPetitionSummary();
        } else {
          this.props.goToAttributesSummary();
        }
      }
    });
  }

  goToNextPage() {
    const comingFromDecidim = this.props.decidimAPIUrl;
    if (comingFromDecidim) {
      this.goToPetition();
    } else {
      this.props.goToAttributesLanding();
    }
  }

  validatePinCode() {
    return this.props.doAuthorize(this.props.pinCode).then((action) => {
      if (action.pinCorrect) {
        Keyboard.dismiss();
        this.goToNextPage();
      } else {
        alert(this.props.t('badPin')); // eslint-disable-line
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={50}
      >
        <View style={styles.homeContainer}>
          <Image
            style={styles.homeLogo}
            source={decodeLogo}
          />
          <View style={styles.homeTextInput}>
            <Text style={{ marginVertical: 10 }}>PIN:&nbsp;&nbsp;</Text>
            <TextInput
              style={styles.homePassword}
              placeholder=" Pin"
              keyboardType="numeric"
              secureTextEntry
              underlineColorAndroid="transparent"
              onChangeText={pin => this.props.updatePin(pin)}
              value={this.props.pinCode}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button
              name={this.props.t('button')}
              onPress={this.validatePinCode}
              style={{
                width: 150,
                alignItems: 'center',
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

Home.propTypes = {
  goToAttributesLanding: PropTypes.func.isRequired,
  goToAttributesSummary: PropTypes.func.isRequired,
  goToPetitionSummary: PropTypes.func.isRequired,
  goToError: PropTypes.func.isRequired,
  getPetition: PropTypes.func.isRequired,
  initializeState: PropTypes.func.isRequired,
  doAuthorize: PropTypes.func.isRequired,
  updatePin: PropTypes.func.isRequired,
  petitionError: PropTypes.string,
  petitionId: PropTypes.string,
  decidimAPIUrl: PropTypes.string,
  decidimClient: PropTypes.instanceOf(DecidimClient).isRequired,
  pinCode: PropTypes.string,
  attributes: PropTypes.shape({
    list: PropTypes.instanceOf(Map),
  }).isRequired,
  t: PropTypes.func.isRequired,
};

Home.defaultProps = {
  petitionError: undefined,
  decidimAPIUrl: undefined,
  petitionId: undefined,
  pinCode: '',
};

const mapStateToProps = state => ({
  decidimAPIUrl: state.decidimInfo.decidimAPIUrl,
  petitionId: state.decidimInfo.petitionId,
  pinCode: state.authorization.pin,
  attributes: state.attributes,
  petitionError: state.petition.error,
  decidimClient: new DecidimClient(new LanguageService(), state.decidimInfo.decidimAPIUrl),
});

const mockedMakingSenseCredential = new Attribute({
  predicate: 'schema:iotCommunity', object: 'MakingSense', scope: '', provenance: { url: 'https://making-sense.eu/credential-issuer' },
}, '6c347975ca6aac24b46d9749808ae5392816ac23988e5dc46df4b85c0a', '');

const mapDispatchToProps = dispatch => ({
  goToAttributesLanding: () => { dispatch(goToAttributesLanding()); },
  goToAttributesSummary: () => { dispatch(goToAttributesSummary()); },
  goToPetitionSummary: () => { dispatch(goToPetitionSummary()); },
  goToError: () => { dispatch(goToError()); },
  getPetition: (decidimClient, decidimAPIUrl, petitionId) => dispatch(getPetition(decidimClient, petitionId)), // eslint-disable-line
  doAuthorize: pin => dispatch(authorizationAction(pin, SecureStore.getItemAsync)),
  updatePin: pin => dispatch(updatePin(pin)),
  initializeState: async () => {
    await dispatch(setDecidimInfo());
    await dispatch(loadCredentials(SecureStore.getItemAsync));
    await dispatch(setCredential(
      SecureStore.getItemAsync,
      SecureStore.setItemAsync,
      mockedMakingSenseCredential,
    ));
  },
});

export default translate('home', { i18n })(connect(mapStateToProps, mapDispatchToProps)(Home));
