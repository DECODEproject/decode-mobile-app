import React from 'react';
import { StyleSheet, Image, Text, View, Button, FlatList } from 'react-native';

const decodeLogo = require('../assets/images/wallet_logo.png');


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 30,
  },
  logo: {
    height: 60,
    marginBottom: 20,
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
});

function Authorisation() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={decodeLogo}
      />
      <View style={styles.textContainer}>
        <Text style={styles.textHeading}>Secure Petitions is requesting
        to connect with your DECODE wallet</Text>
        <Text style={styles.textParagraph}>Secure Petitions may request access to
        the following information stored in your wallet.</Text>
        <FlatList
          style={styles.flatList}
          data={[{ key: '- Atlantis Residency' }]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
        <Text>Accepting this connection will not automatically share
        this information with Secure Petitions.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => true}
          title="Authorise Connection"
          color="rgb(0,163,158)"
        />
      </View>
    </View>
  );
}

export default Authorisation;
