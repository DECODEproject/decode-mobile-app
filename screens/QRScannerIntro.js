import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { goToQRScanner } from '../application/redux/actions/navigation';
import styles from './styles';

const scanner = require('../assets/images/scanner.jpg');

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
        <View style={styles.QRScannerIntroButtonBox}>
          <Image
            style={styles.QRScannerIntroScanner}
            source={scanner}
          />
          <Text style={styles.QRScannerIntroInstructions}>Scan a QR code to get started</Text>
          <TouchableOpacity
            style={styles.QRScannerIntroButton}
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

