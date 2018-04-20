import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { goToQRScanner } from '../application/redux/actions/navigation';

const scanner = require('../assets/images/scanner.jpg');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 75,
  },
  buttonBox: {
    alignSelf: 'center',
    width: 250,
  },
  scanner: {
    alignSelf: 'center',
    height: 100,
    marginBottom: 20,
    width: 50,
  },
  instructions: {
    alignSelf: 'center',
    fontSize: 12,
    textAlign: 'center',
    width: 150,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'rgb(0,163,158)',
    borderRadius: 2,
    elevation: 2,
    height: 36,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 15,
    marginTop: 30,
    shadowColor: 'rgba(0, 0, 0, 0.54)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 250,
  },
  buttonText: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

class QRScannerIntro extends React.Component {
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
    this.props.goQRScanner();
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
            <Text style={styles.buttonText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

QRScannerIntro.propTypes = {
  goQRScanner: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  goQRScanner: () => { dispatch(goToQRScanner()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(QRScannerIntro);

