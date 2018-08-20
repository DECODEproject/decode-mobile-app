import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';

const defaultLinkButtonStyles = {
  linkButtonStyle: {
    flex: 0,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  textStyle: {
    color: '#4A90E2',
    fontSize: 16,
  },
};

class LinkButton extends Component {
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
      }
    };
    return (
      <TouchableOpacity onPress={onPress} style={linkButtonStyle} >
        <Text style={textStyle}>{name}</Text>
      </TouchableOpacity>
    )
  }

};

LinkButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string,
  customStyle: PropTypes.shape({}),
};

LinkButton.defaultProps = {
  onPress: () => {
    DatePicker.onPressDate()
  },
  style: {},
  name: 'ADD',
};

export default LinkButton;
