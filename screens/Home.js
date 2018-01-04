import React from 'react';
import { Platform, StyleSheet, Image, Text, TextInput, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import Router from '../Router';

const decodeLogo = require('../assets/images/wallet_logo.png');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 75,
  },
  logo: {
    height: 150,
    marginBottom: 50,
    width: 200,
  },
  textHeading: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  textInput: {
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    borderColor: 'rgb(0,163,158)',
    marginBottom: 10,
  },
  loginButton: {
    width: 250,
  },
  password: {
    height: Platform.OS === 'ios' ? 30 : 40,
    width: 250,
  },
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.goToAuthorisation = this.goToAuthorisation.bind(this);
    this.goToQRScanner = this.goToQRScanner.bind(this);
  }

  goToAuthorisation() {
    this.props.navigator.push(Router.getRoute('authorisation'));
  }

  goToQRScanner() {
    this.props.navigator.push(Router.getRoute('QRScanner'));
  }


  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={decodeLogo}
        />
        <Text style={styles.textHeading}>Welcome, Jane Doe</Text>
        <View style={styles.textInput}>
          <TextInput
            style={styles.password}
            placeholder="Password"
            secureTextEntry
            underlineColorAndroid="rgb(0,163,158)"
          />
        </View>
        <View style={styles.loginButton}>
          <Button
            onPress={this.goToAuthorisation}
            title="Unlock"
            color="rgb(0,163,158)"
          />
        </View>
        <View style={styles.loginButton}>
          <Button
            onPress={this.goToQRScanner}
            title="QR Code Scanner"
            color="rgb(0,163,158)"
          />
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  navigator: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
