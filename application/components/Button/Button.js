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
import { Text, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

function Button(props) {
  const buttonTextStyle = props.enabled ? styles.buttonText : styles.disabledButtonText;
  const buttonStyle = props.enabled ? styles.signButton : styles.signButtonDisabled;

  return (
    <TouchableOpacity
      disabled={!props.enabled}
      style={[buttonStyle, props.style]}
      onPress={props.onPress}
    >
      <Text style={buttonTextStyle}>{props.name}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  enabled: PropTypes.bool,
  onPress: PropTypes.func,
  name: PropTypes.string.isRequired,
  style: ViewPropTypes.style, // eslint-disable-line
};

Button.defaultProps = {
  onPress: () => {
  },
  enabled: true,
  style: {},
};

export default Button;

