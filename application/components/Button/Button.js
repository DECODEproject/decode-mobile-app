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

