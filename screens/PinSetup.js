import React from 'react';
import { connect } from 'react-redux';
import { SecureStore } from 'expo';
import PropTypes from 'prop-types';
import { Image, TextInput, View, Text, KeyboardAvoidingView } from 'react-native';
import { goToAttributesLanding } from '../application/redux/actions/navigation';
import Button from '../application/components/Button/Button';
import { changeText1, changeText2, storePin } from '../application/redux/actions/pinSetup';
import styles from './styles';

const decodeLogo = require('../assets/images/decode-logo-pin.png');

const PinSetup = props => (
  <KeyboardAvoidingView
    behavior="position"
    keyboardVerticalOffset={50}
  >
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

      {!props.validPinFormat &&
      <Text style={styles.pinError}>
          Pin must be at least 4 digits long
      </Text>}

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
      {!props.validPinEqual &&
      <Text style={styles.pinError}>
        Pin must be same as above
      </Text>}
      <View style={{ flexDirection: 'row' }}>
        <Button
          name="Save"
          onPress={() => props.storePin(props.pin1)}
          style={styles.pinButton}
        />
      </View>
    </View>
  </KeyboardAvoidingView>
);

PinSetup.propTypes = {
  pin1: PropTypes.string.isRequired,
  pin2: PropTypes.string.isRequired,
  validPinFormat: PropTypes.bool.isRequired,
  validPinEqual: PropTypes.bool.isRequired,
  changeText1: PropTypes.func.isRequired,
  changeText2: PropTypes.func.isRequired,
  storePin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  pin1: state.pinSetup.pin1,
  pin2: state.pinSetup.pin2,
  validPinFormat: state.pinSetup.validFormat,
  validPinEqual: state.pinSetup.validEqual,
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
