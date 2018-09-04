import React from 'react';
import { connect } from 'react-redux';
import { Image, Text, TextInput, View, KeyboardAvoidingView, Keyboard } from 'react-native';
import { SecureStore, ScreenOrientation } from 'expo';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { goToAttributesLanding, goToAttributesSummary, goToPetitionSummary, goToError } from '../application/redux/actions/navigation';
import { onStartApp, setDecidimAPIUrl } from '../application/redux/actions/petitionLink';
import { getPetition } from '../application/redux/actions/petition';
import { loadCredentials } from '../application/redux/actions/attributes';
import authorizationAction, { updatePin } from '../application/redux/actions/authorization';
import Button from '../application/components/Button/Button';
import i18n from '../i18n';


import styles from './styles';
import DecidimClient from '../lib/DecidimClient';
import LanguageService from '../lib/LanguageService';

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
    return this.props.getPetition(this.props.decidimClient, this.props.petitionLink, this.props.decidimAPIUrl, '40').then(() => {
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
    const comingFromDecidim = this.props.petitionLink || this.props.decidimAPIUrl;
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
  petitionLink: PropTypes.string,
  petitionError: PropTypes.string,
  decidimAPIUrl: PropTypes.string,
  decidimClient: PropTypes.instanceOf(DecidimClient),
  pinCode: PropTypes.string,
  attributes: PropTypes.shape({
    list: PropTypes.instanceOf(Map),
  }).isRequired,
  t: PropTypes.func.isRequired,
};

Home.defaultProps = {
  petitionLink: undefined,
  petitionError: undefined,
  decidimAPIUrl: undefined,
  pinCode: '',
  decidimClient: new DecidimClient(new LanguageService()),
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
  decidimAPIUrl: state.petitionLink.decidimAPIUrl,
  pinCode: state.authorization.pin,
  attributes: state.attributes,
  petitionError: state.petition.error,
});

const mapDispatchToProps = dispatch => ({
  goToAttributesLanding: () => { dispatch(goToAttributesLanding()); },
  goToAttributesSummary: () => { dispatch(goToAttributesSummary()); },
  goToPetitionSummary: () => { dispatch(goToPetitionSummary()); },
  goToError: () => { dispatch(goToError()); },
  getPetition: (decidimClient, petitionLink, decidimAPIUrl, petitionId) => dispatch(getPetition(decidimClient, petitionLink, decidimAPIUrl, petitionId)), // eslint-disable-line
  doAuthorize: pin => dispatch(authorizationAction(pin, SecureStore.getItemAsync)),
  updatePin: pin => dispatch(updatePin(pin)),
  initializeState: async () => {
    await dispatch(onStartApp());
    await dispatch(setDecidimAPIUrl());
    await dispatch(loadCredentials(SecureStore.getItemAsync));
  },
});

export default translate('home', { i18n })(connect(mapStateToProps, mapDispatchToProps)(Home));
