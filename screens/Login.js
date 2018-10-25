import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import i18n from '../i18n';

export function EmptyLogin(props) {
  return (
    <Text style={{ fontSize: 20, color: '#a2a2a2', textAlign: 'center' }}>{props.message}</Text>
  );
}

EmptyLogin.propTypes = {
  message: PropTypes.string.isRequired,
};


function Login(props) {
  return (
    <View style={{ flex: 1, padding: 26 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text style={{ fontSize: 14 }}>
          BCNNow requires a credential to log you in
        </Text>
      </View>
      <View style={{ flex: 6, justifyContent: 'center' }}>
        <EmptyLogin message={props.t('emptyMessage')} />
      </View>
    </View>
  );
}

Login.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapDispatchToProps = () => ({});
const mapStateToProps = () => ({});

export default translate('login', { i18n })(connect(mapStateToProps, mapDispatchToProps)(Login));
