import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

const DoneButton = ({ onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style.buttonStyle} >
    <Text style={style.textStyle}>Done</Text>
  </TouchableOpacity>
);

DoneButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({}).isRequired,
};

export default DoneButton;
