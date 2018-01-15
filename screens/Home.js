import React from 'react';
import { Platform, StyleSheet, Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
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
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  textInput: {
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    borderColor: 'rgb(0,163,158)',
    marginBottom: 20,
  },
  password: {
    height: Platform.OS === 'ios' ? 30 : 40,
    width: 250,
  },
  Button: {
    alignSelf: 'center',
    backgroundColor: 'rgb(0,163,158)',
    borderRadius: 2,
    elevation: 2,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    shadowColor: 'rgba(0, 0, 0, 0.54)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 250,
  },
  QRButton: {
    marginTop: 80,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
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
        <TouchableOpacity
          style={styles.Button}
          onPress={this.goToAuthorisation}
        >
          <Text style={styles.buttonText}>UNLOCK</Text>
        </TouchableOpacity>
        <View style={styles.QRButton}>
          <TouchableOpacity
            style={styles.Button}
            onPress={this.goToQRScanner}
          >
            <Text style={styles.buttonText}>QR SCANNER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  navigator: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
