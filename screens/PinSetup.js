import React from 'react';
import { connect } from 'react-redux';
import { SecureStore } from 'expo';
import PropTypes from 'prop-types';
import { Image, TextInput, View, Text } from 'react-native';
import { goToAttributesLanding } from '../application/redux/actions/navigation';
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

    <Text style={styles.pinTitle}>
      Protect Your wallet
    </Text>
    <Text style={styles.pinSubtitle}>
      Let&#39;s setup a pin, so no one else can access your data
    </Text>

    <Text style={styles.pinInputLabel}>
      Enter PIN:
    </Text>
    <TextInput
      style={styles.pinPassword}
      placeholder=" At least 4 digits"
      keyboardType="numeric"
      secureTextEntry
      underlineColorAndroid="transparent"
      value={props.pin1}
      onChangeText={pin => props.changeText1(pin)}
    />
    <Text style={styles.pinInputLabel}>
      Confirm Pin:
    </Text>
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
  storePin: async (pin) => {
    await dispatch(storePin(SecureStore.setItemAsync, pin));
    dispatch(goToAttributesLanding());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PinSetup);
