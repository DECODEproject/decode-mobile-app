import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Router from '../Router';

const scanner = require('../assets/images/scanner.jpg');

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: 'rgb(0,163,158)',
    borderRadius: 2,
    elevation: 2,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    marginBottom: 15,
    marginTop: 30,
    shadowColor: 'rgba(0, 0, 0, 0.54)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 250,
  },
  buttonBox: {
    width: 250,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 75,
  },
  instructions: {
    fontSize: 12,
    width: 150,
    alignSelf: 'center',
    textAlign: 'center',
  },
  scanner: {
    height: 100,
    width: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default class QRScannerIntro extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      fontSize: 20,
      fontWeight: '500',
      tintColor: 'rgb(0,163,158)',
      title: 'Get Started',
    },
  }

  constructor(props) {
    super(props);
    this.goToQRScanner = this.goToQRScanner.bind(this);
  }

  goToQRScanner() {
    this.props.navigator.push(Router.getRoute('QRScanner'));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonBox}>
          <Image
            style={styles.scanner}
            source={scanner}
          />
          <Text style={styles.instructions}>Scan a QR code to get started</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.goToQRScanner}
          >
            <Text style={styles.buttonText}>SCAN QR CODE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

QRScannerIntro.propTypes = {
  navigator: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

QRScannerIntro.defaultProps = {
  navigator: {
    push: () => {
    },
  },
};

