import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 75,
  },
  textHeading: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
});

function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>SUP DOG</Text>
    </View>
  );
}

export default Home;
