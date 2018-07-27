import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

const doneButtonStyles = {
  buttonStyle: {
    flex: 0,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
  },
};

const DoneButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={doneButtonStyles.buttonStyle} >
    <Text style={doneButtonStyles.textStyle}>Done</Text>
  </TouchableOpacity>
);

DoneButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};


export default DoneButton;
