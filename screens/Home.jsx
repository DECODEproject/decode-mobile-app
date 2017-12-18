import React from 'react';
import { StyleSheet, Image, Text, TextInput, View, Button } from 'react-native';

const decodeLogo = require('../assets/images/decode_logo.png');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 100,
  },
  logo: {
    height: 100,
    marginBottom: 20,
    width: 200,
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    marginBottom: 40,
    marginTop: 40,
  },
});

function Home() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={decodeLogo}
      />
      <Text style={styles.text}>Welcome to the DECODE Wallet</Text>
      <TextInput
        placeholder="Password"
        style={{ height: 40, width: 250, marginBottom: 20 }}
        underlineColorAndroid="rgb(0,163,158)"
      />
      <Button
        onPress={() => true}
        title="Unlock"
        color="rgb(0,163,158)"
      />
    </View >
  );
}

export default Home;
