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

import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

const defaultLinkButtonStyles = {
  linkButtonStyle: {
    flex: 0,
    paddingHorizontal: 10,
  },
  textStyle: {
    color: '#4A90E2',
    fontSize: 16,
  },
};

class LinkButton extends Component { // eslint-disable-line
  render() {
    const { onPress, name, style } = this.props;
    const { linkButtonStyle, textStyle } = {
      linkButtonStyle: {
        ...defaultLinkButtonStyles.linkButtonStyle,
        ...style.linkButtonStyle,
      },
      textStyle: {
        ...defaultLinkButtonStyles.textStyle,
        ...style.textStyle,
      },
    };
    return (
      <TouchableOpacity onPress={onPress} style={linkButtonStyle} >
        <Text style={textStyle}>{name}</Text>
      </TouchableOpacity>
    );
  }
}

LinkButton.propTypes = {
  onPress: PropTypes.func,
  name: PropTypes.string,
  style: PropTypes.shape({}),
};

LinkButton.defaultProps = {
  onPress: () => { },
  style: {},
  name: 'ADD',
};

export default LinkButton;
