import React from 'react';
import { translate } from 'react-i18next';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '../../../i18n';
import Credential from '../Credential/Credential';

function CredentialList(props) {
  return (
    <View>
      <Text>{props.t('subHeader')}</Text>
      <Credential />
    </View>
  );
}

CredentialList.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapDispatchToProps = () => ({});
const mapStateToProps = () => ({});
export default translate('login', { i18n })(connect(mapDispatchToProps, mapStateToProps)(CredentialList));
