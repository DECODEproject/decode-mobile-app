import React from 'react';
import { StyleSheet, Image, Text, View, Button, FlatList } from 'react-native';

const decodeLogo = require('../assets/images/wallet_logo.png');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  logo: {
    height: 60,
    marginBottom: 30,
    width: 80,
  },
  textHeading: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  textContainer: {
    marginBottom: 30,
    width: 300,
  },
  flatList: {
    marginTop: 15,
    marginBottom: 30,
  },
  buttonContainer: {
    width: 300,
  },
  textParagraph: {
    marginBottom: 15,
  },
  PetitionSummary: {
    backgroundColor: '#EEE',
    width: 300,
  },
  textSubHeading: {
    fontSize: 16,
  },
});

function PetitionSummarySign() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={decodeLogo}
      />
      <Text style={styles.textSubHeading}>Thank you for signing</Text>
      <Text style={styles.textHeading}>Create communal space in Atlantis</Text>
      <Text style={styles.textParagraph}>You can view the results of the petition by returning to Secure Petitions</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => true}
          title="Return to Secure Petitions"
          color="rgb(0,163,158)"
        />
      </View>
    </View>
  );
}

export default PetitionSummarySign;
