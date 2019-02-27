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
import { Text, View, Switch } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default function Attribute(props) {
  const disabledAttributeText = (
    <Text style={styles.disabledAttributeText}>
      {props.requiredError}
    </Text>
  );
  return (
    <View style={styles.attributeContainerVerified}>
      <View style={styles.attribute}>
        <Text style={styles.attributeName}>{props.name}</Text>
        { props.isMandatory && <Text style={{ color: '#D0021B' }}> *</Text> }
        <Text style={styles.attributeValue}>{props.value}</Text>
        <Switch onValueChange={props.toggleCallback} value={props.isEnabled} />
      </View>
      { !props.isEnabled && props.isMandatory && disabledAttributeText }
    </View>);
}

Attribute.propTypes = {
  isMandatory: PropTypes.bool,
  toggleCallback: PropTypes.func,
  isEnabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  requiredError: PropTypes.string.isRequired,
};

Attribute.defaultProps = {
  toggleCallback: () => {},
  isMandatory: false,
  isEnabled: true,
};
