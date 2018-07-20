import React from 'react';
import { TextInput, View } from 'react-native';
import Button from '../application/components/Button/Button';

const PinSetup = () => (
  <View>
    <TextInput />
    <TextInput />
    <Button name="Save" />
  </View>
);

export default PinSetup;
