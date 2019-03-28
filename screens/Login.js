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
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import i18n from '../i18n';
import CredentialList from '../application/components/CredentialList/CredentialList';
import ScreenLogo from '../application/components/ScreenLogo/ScreenLogo';
import { pickCredentials } from '../lib/attributes';

function MessageComponent(msg, detail) {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{ fontSize: 20, color: '#a2a2a2', textAlign: 'center' }}>{msg}</Text>
      {detail ? <Text style={{ color: '#a2a2a2', textAlign: 'center' }}>{detail}</Text> : null}
    </View>
  );
}
export function EmptyLogin(props) {
  return MessageComponent(props.message);
}

export function ErrorLogin(props) {
  return MessageComponent(props.failedMessage, props.detailMessage);
}

export function SuccessLogin(props) {
  return MessageComponent(props.successMessage);
}

EmptyLogin.propTypes = {
  message: PropTypes.string.isRequired,
};

function Login(props) {
  let mainComponent;
  if (!props.hasCredentials) {
    mainComponent = (<EmptyLogin message={props.t('emptyMessage')} />);
  } else if (props.loginHasFailed) {
    const {loginErrorCode, loginErrorMessage} = props;
    if (loginErrorCode === 408) {
      mainComponent = <ErrorLogin failedMessage={props.t('timeout')}/>
    } else {
      mainComponent = <ErrorLogin failedMessage={props.t('failedMessage')} detailMessage={`${loginErrorCode}: ${loginErrorMessage}`}/>
    }
  } else if (props.loginIsSuccessful) {
    mainComponent = (<SuccessLogin successMessage={props.t('successMessage')}  style={{alignSelf: 'center'}}/>);
  } else {
    mainComponent = (<CredentialList bcnnowUrl={props.route.params.bcnnowUrl} sessionId={props.route.params.sessionId} />);
  }

  return (
    <View style={{ flex: 1, padding: 20}}>
      <ScreenLogo />
      <View>
        <Spinner visible={props.loading} textStyle={{color: '#FFF'}} />
      </View>
      <View>
        <Text style={{ fontSize: 14, paddingVertical: 20 }}>
          {props.t('header')}
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-between'  }}>
        {mainComponent}
      </View>
    </View>
  );
}

Login.propTypes = {
  t: PropTypes.func.isRequired,
  hasCredentials: PropTypes.bool.isRequired,
  loginHasFailed: PropTypes.bool.isRequired,
  loginIsSuccessful: PropTypes.bool.isRequired,
};

const mapDispatchToProps = () => ({});
const mapStateToProps = state => ({
  hasCredentials: pickCredentials(state.attributes.list).length !== 0,
  loginHasFailed: state.login.failed,
  loginIsSuccessful: state.login.success,
  loginErrorCode: state.login.errorCode,
  loginErrorMessage: state.login.errorReason,
  loading: state.login.loading,
});

export default translate('login', { i18n })(connect(mapStateToProps, mapDispatchToProps)(Login));
