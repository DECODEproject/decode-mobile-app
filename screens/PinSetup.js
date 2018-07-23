import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';
import Button from '../application/components/Button/Button';
import { changeText1 } from '../application/redux/actions/pinSetup';

const PinSetup = props => (
  <View>
    <TextInput
      value={props.pin1}
      onChangeText={pin => this.props.changeText1(pin)}
    />
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

const mapDispatchToProps = dispatch => ({
  changeText1: pin => dispatch(changeText1(pin)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PinSetup);
