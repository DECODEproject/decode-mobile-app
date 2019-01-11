import React from 'react';
import { connect } from 'react-redux';
import { Image, Text, TextInput, View, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
import { SecureStore, ScreenOrientation } from 'expo';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { goToAttributesLanding, goToLogin } from '../application/redux/actions/navigation';
import setDecidimInfo from '../application/redux/actions/decidimInfo';
import { loadCredentials } from '../application/redux/actions/attributes';
import { setCredential, checkComingFromLogin } from '../application/redux/actions/login';
import goToPetition from '../application/redux/actions/home';
import authorizationAction, { updatePin, resetPin } from '../application/redux/actions/authorization';
import Button from '../application/components/Button/Button';
import i18n from '../i18n';
import ZenroomExecutor from '../lib/ZenroomExecutor';
import helloContract from '../assets/contracts/pair';


import styles from './styles';
import DecidimClient from '../lib/DecidimClient';
import LanguageService from '../lib/LanguageService';
import Attribute from '../lib/Attribute';

const decodeLogo = require('../assets/images/decode-hexagon.png');


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.validatePinCode = this.validatePinCode.bind(this);
    this.sayHelloToZenroom = this.sayHelloToZenroom.bind(this);
  }


  componentWillMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
    this.props.initializeState(this.props.loginFT).then(() => {});
  }

  goToNextPage() {
    const comingFromDecidim = this.props.decidimAPIUrl;
    const comingFromLogin = this.props.isComingFromLogin;
    if (this.props.loginFT) {
      this.handleRedirectWithLogin(comingFromLogin, comingFromDecidim);
    } else {
      this.handleRedirectWithoutLogin(comingFromDecidim);
    }
  }

  handleRedirectWithLogin(comingFromLogin, comingFromDecidim) {
    if (comingFromLogin) {
      this.props.goToLogin();
    } else if (comingFromDecidim) {
      this.props.goToPetition(this.props.decidimClient, this.props.petitionId);
    } else {
      this.props.goToAttributesLanding();
    }
  }

  handleRedirectWithoutLogin(comingFromDecidim) {
    if (comingFromDecidim) {
      this.props.goToPetition(this.props.decidimClient, this.props.petitionId);
    } else {
      this.props.goToAttributesLanding();
    }
  }

  validatePinCode() {
    return this.props.doAuthorize(this.props.pinCode).then((action) => {
      if (action.pinCorrect) {
        Keyboard.dismiss();
        this.props.resetPin();
        this.goToNextPage();
      } else {
        alert(this.props.t('badPin')); // eslint-disable-line
      }
    });
  }

  async sayHelloToZenroom() {
    try{
        const helloResponse = await ZenroomExecutor.execute(helloContract, "", "");
        alert(`Zenroom says: ${helloResponse}`);
    } catch(e) {
        alert(`Zenroom complains: ${e}`);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={50}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.homeContainer}>
            <Image
              style={styles.homeLogo}
              source={decodeLogo}
            />
              {}
            <Button
                name='Hello Zenroom'
                onPress={this.sayHelloToZenroom}
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
                onSubmitEditing={this.validatePinCode}
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
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

Home.propTypes = {
  goToAttributesLanding: PropTypes.func.isRequired,
  goToLogin: PropTypes.func.isRequired,
  goToPetition: PropTypes.func.isRequired,
  initializeState: PropTypes.func.isRequired,
  doAuthorize: PropTypes.func.isRequired,
  updatePin: PropTypes.func.isRequired,
  petitionId: PropTypes.string,
  decidimAPIUrl: PropTypes.string,
  decidimClient: PropTypes.instanceOf(DecidimClient).isRequired,
  pinCode: PropTypes.string,
  t: PropTypes.func.isRequired,
  loginFT: PropTypes.bool,
  isComingFromLogin: PropTypes.bool.isRequired,
  resetPin: PropTypes.func.isRequired,
};

Home.defaultProps = {
  decidimAPIUrl: undefined,
  petitionId: undefined,
  pinCode: '',
  loginFT: false,
};

const mapStateToProps = state => ({
  decidimAPIUrl: state.decidimInfo.decidimAPIUrl,
  petitionId: state.decidimInfo.petitionId,
  pinCode: state.authorization.pin,
  decidimClient: new DecidimClient(new LanguageService(), state.decidimInfo.decidimAPIUrl),
  loginFT: state.featureToggles.login,
  isComingFromLogin: state.login.isComingFromLogin,
});

const mockedMakingSenseCredential = new Attribute({
  predicate: 'schema:iotCommunity', object: 'MakingSense', scope: '', provenance: { url: 'https://making-sense.eu/credential-issuer' },
}, '6c347975ca6aac24b46d9749808ae5392816ac23988e5dc46df4b85c0a', '');

const mapDispatchToProps = dispatch => ({
  goToAttributesLanding: () => { dispatch(goToAttributesLanding()); },
  goToLogin: () => { dispatch(goToLogin()); },
  goToPetition: (decidimClient, petitionId) => {
    dispatch(goToPetition(decidimClient, petitionId));
  },
  doAuthorize: pin => dispatch(authorizationAction(pin, SecureStore.getItemAsync)),
  updatePin: pin => dispatch(updatePin(pin)),
  resetPin: () => dispatch(resetPin()),
  initializeState: async (loginFT) => {
    await dispatch(setDecidimInfo());
    await dispatch(checkComingFromLogin());
    await dispatch(loadCredentials(SecureStore.getItemAsync));
    if (loginFT) {
      await dispatch(setCredential(SecureStore.setItemAsync, mockedMakingSenseCredential));
    }
  },
});

export default translate('home', { i18n })(connect(mapStateToProps, mapDispatchToProps)(Home));
