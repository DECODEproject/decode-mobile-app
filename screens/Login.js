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
import i18n from '../i18n';
import CredentialList from '../application/components/CredentialList/CredentialList';
import ScreenLogo from '../application/components/ScreenLogo/ScreenLogo';
import { pickCredentials } from '../application/utils/attributeManagement';

function MessageComponent(msg) {
  return (
    <Text style={{ fontSize: 20, color: '#a2a2a2', textAlign: 'center' }}>{msg}</Text>
  );
}
export function EmptyLogin(props) {
  return MessageComponent(props.message);
}

export function ErrorLogin(props) {
  return MessageComponent(props.failedMessage);
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
    mainComponent = (<ErrorLogin failedMessage={props.t('failedMessage')} />);
  } else if (props.loginIsSuccessful) {
    mainComponent = (<SuccessLogin successMessage={props.t('successMessage')} />);
  } else {
    mainComponent = (<CredentialList bcnnowUrl={props.route.params.bcnnowUrl} sessionId={props.route.params.sessionId} />);
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScreenLogo />
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text style={{ fontSize: 14 }}>
          {props.t('header')}
        </Text>
      </View>
      <View style={{ flex: 6, justifyContent: 'center' }}>
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
});

export default translate('login', { i18n })(connect(mapStateToProps, mapDispatchToProps)(Login));
