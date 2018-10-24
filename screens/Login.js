import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import i18n from '../i18n';

export function EmptyLogin(props) {
  return (
    <Text>{props.message}</Text>
  );
}

EmptyLogin.propTypes = {
  message: PropTypes.string.isRequired,
};


function Login(props) {
  return (
    <View>
      <EmptyLogin message={props.t('emptyMessage')} />
    </View>
  );
}

Login.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapDispatchToProps = () => ({});
const mapStateToProps = () => ({});

export default translate('login', { i18n })(connect(mapStateToProps, mapDispatchToProps)(Login));
