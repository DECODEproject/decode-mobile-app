import React from 'react';
import { View, Text } from 'react-native';
import Button from '../application/components/Button/Button';
import styles from './styles';

const NewAttributes = () => (
  <View style={styles.newAttributesContainer}>
    <Text>Select an attribute to add to your wallet from the list below.</Text>
    <View style={styles.newAttributesAttribute}>
      <Text style={styles.newAttributesAttributeName}>Date of birth</Text>
      <Button name="Add" />
    </View>
  </View>
);

export default NewAttributes;
