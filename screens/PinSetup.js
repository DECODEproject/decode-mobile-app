import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { SecureStore } from 'expo';
import PropTypes from 'prop-types';
import { Image, TextInput, View, Text, KeyboardAvoidingView } from 'react-native';
import Button from '../application/components/Button/Button';
import { changeText1, changeText2, storePin } from '../application/redux/actions/pinSetup';
import styles from './styles';
import i18n from '../i18n';

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
        {props.t('title')}
      </Text>
      <Text style={styles.pinSubtitle}>
        {props.t('subtitle')}
      </Text>

      <View style={{ height: 90 }}>
        <Text style={styles.pinInputLabel}>
          {props.t('labelPin1')}
        </Text>
        <TextInput
          style={styles.pinPassword}
          placeholder={props.t('placeholderPin1')}
          keyboardType="numeric"
          secureTextEntry
          underlineColorAndroid="transparent"
          value={props.pin1}
          onChangeText={pin => props.changeText1(pin)}
        />

        {!props.validPinFormat &&
        <Text style={styles.pinError}>
          { props.t('errorPin1') }
        </Text>}
      </View>
      <View style={{ height: 90 }}>
        <Text style={styles.pinInputLabel}>
          {props.t('labelPin2')}
        </Text>
        <TextInput
          style={styles.pinPassword}
          placeholder={props.t('placeholderPin2')}
          keyboardType="numeric"
          secureTextEntry
          underlineColorAndroid="transparent"
          value={props.pin2}
          onChangeText={pin => props.changeText2(pin)}
        />
        {!props.validPinEqual &&
        <Text style={styles.pinError}>
          {props.t('errorPin2')}
        </Text>}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button
          name={props.t('button')}
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
  t: PropTypes.func.isRequired,
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
  storePin: pin => dispatch(storePin(SecureStore.setItemAsync, pin)),
});

export default translate('pinSetup', { i18n })(connect(mapStateToProps, mapDispatchToProps)(PinSetup));
