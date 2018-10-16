import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { translate } from 'react-i18next';
import i18n from '../../../i18n';

const RequesterInfo = props => (
  <View style={{ paddingVertical: 20 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 14, lineHeight: 20 }}>{props.t('title')}</Text>
    <Text style={{ fontSize: 14, lineHeight: 20 }}>{props.t('subtitle')}</Text>
  </View>
);

RequesterInfo.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('attributesSummary', { i18n })(connect()(RequesterInfo));
