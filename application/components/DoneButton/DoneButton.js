import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

const DoneButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} >
    <Text style={{}}>Done</Text>
  </TouchableOpacity>
);

DoneButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default DoneButton;
