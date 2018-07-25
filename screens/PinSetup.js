import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, TextInput, View } from 'react-native';
import Button from '../application/components/Button/Button';
import { changeText1, changeText2, storePin } from '../application/redux/actions/pinSetup';
import styles from './styles';

const decodeLogo = require('../assets/images/decode-hexagon.png');

const PinSetup = props => (
  <View style={styles.pinContainer}>
    <Image
      style={styles.pinLogo}
      source={decodeLogo}
    />
    <TextInput
      style={styles.pinPassword}
      placeholder=" Pin"
      keyboardType="numeric"
      secureTextEntry
      underlineColorAndroid="transparent"
      value={props.pin1}
      onChangeText={pin => props.changeText1(pin)}
    />
    <TextInput
      style={styles.pinPassword}
      placeholder=" Confirm pin"
      keyboardType="numeric"
      secureTextEntry
      underlineColorAndroid="transparent"
      value={props.pin2}
      onChangeText={pin => props.changeText2(pin)}
    />
    <View style={{ flexDirection: 'row' }}>
      <Button
        name="Save"
        onPress={() => props.storePin(props.pin1)}
        style={styles.pinButton}
        enabled={props.valid}
      />
    </View>
  </View>
);

PinSetup.propTypes = {
  pin1: PropTypes.string.isRequired,
  pin2: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
  changeText1: PropTypes.func.isRequired,
  changeText2: PropTypes.func.isRequired,
  storePin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  pin1: state.pinSetup.pin1,
  pin2: state.pinSetup.pin2,
  valid: state.pinSetup.validated,
});

const mapDispatchToProps = dispatch => ({
  changeText1: pin => dispatch(changeText1(pin)),
  changeText2: pin => dispatch(changeText2(pin)),
  storePin: pin => dispatch(storePin(pin)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PinSetup);
