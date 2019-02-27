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
import { Image, Text, TextInput, View, KeyboardAvoidingView, Keyboard, ScrollView, Dimensions } from 'react-native';
import { SecureStore, ScreenOrientation, Linking } from 'expo';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { goToAttributesLanding, goToLogin } from '../application/redux/actions/navigation';
import setDecidimInfo from '../application/redux/actions/decidimInfo';
import { loadCredentials } from '../application/redux/actions/attributes';
import { checkComingFromLogin, initLogin } from '../application/redux/actions/login';
import goToPetition from '../application/redux/actions/home';
import authorizationAction, { updatePin, resetPin } from '../application/redux/actions/authorization';
import Button from '../application/components/Button/Button';
import i18n from '../i18n';
import ZenroomExecutor from '../lib/ZenroomExecutor';
import helloContract from '../assets/contracts/pair';
import linkingHandler from '../lib/linkingHandler';
import styles from './styles';
import DecidimClient from '../lib/DecidimClient';
import LanguageService from '../lib/LanguageService';

const decodeLogo = require('../assets/images/decode-logo-pin.png');
const {height: windowHeight} = Dimensions.get('window');

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
  componentDidMount() {
    Linking.addEventListener('url', linkingHandler(this.props.goToPetition, this.props.goToLogin));
  };
  componentWillUnmount() {
    Linking.removeEventListener('url', linkingHandler(this.props.goToPetition, this.props.goToLogin));
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
      >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: windowHeight,
        }}>
          <View style={{
            flex: 1,
          }}>
            <Image
              style={styles.pinLogo}
              source={decodeLogo}
            />
          </View>
          <View style={{flex: 1}}>
            {/*<Button*/}
                {/*name='Hello Zenroom'*/}
                {/*onPress={this.sayHelloToZenroom}*/}
            {/*/>*/}

            <Text style={{ marginVertical: 10, marginHorizontal: 16 }}>PIN:&nbsp;&nbsp;</Text>
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

            <View style={styles.homeTextInput}>
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

const mapDispatchToProps = dispatch => ({
  goToAttributesLanding: () => { dispatch(goToAttributesLanding()); },
  goToLogin: (bcnnowUrl, sessionId) => {
    dispatch(initLogin());
    dispatch(goToLogin(bcnnowUrl, sessionId));
  },
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
  },
});

export default translate('home', { i18n })(connect(mapStateToProps, mapDispatchToProps)(Home));
