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
