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
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { translate } from 'react-i18next';
import i18n from '../../../i18n';

const RequesterInfo = props => (
  <View style={{ paddingVertical: 20 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 14, lineHeight: 20 }}>{props.name || props.t('genericName')} {props.t('title')}</Text>
    <Text style={{ fontSize: 14, lineHeight: 20 }}>{props.t('subtitle')}</Text>
  </View>
);

RequesterInfo.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('attributesSummary', { i18n })(connect()(RequesterInfo));
