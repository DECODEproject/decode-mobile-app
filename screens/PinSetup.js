import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';
import Button from '../application/components/Button/Button';

const PinSetup = props => (
  <View>
    <TextInput value={props.pin1} />
    <TextInput value={props.pin2} />
    <Button name="Save" />
  </View>
);

PinSetup.propTypes = {
  pin1: PropTypes.string.isRequired,
  pin2: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  pin1: state.pinSetup.pin1,
  pin2: state.pinSetup.pin2,
});

export default connect(mapStateToProps)(PinSetup);
