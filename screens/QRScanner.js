import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import PropTypes from 'prop-types';
import Router from '../Router';

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
}

export default class QRScanner extends React.Component {
  static route = {
    navigationBar: {
      tintColor: 'rgb(0,163,158)',
      title: 'QR Scanner',
    },
  }

  constructor(props) {
    super(props);
    this.handleBarCodeRead = this.handleBarCodeRead.bind(this);
    this.state = {
      hasCameraPermission: null,
      permissionAsked: false,
      read: null,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeRead = async () => {
    await delay(500);
    if (this.state.read === true) return;
    this.setState({ read: true });
    this.props.navigator.push(Router.getRoute('authorisation'));
  }

  render() {
    const { hasCameraPermission, permissionAsked } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false && permissionAsked === false) {
      this.state.permissionAsked = true;
      Alert.alert('This app needs an access to your camera. Please enable it in the settings');
      return null;
    } else if (hasCameraPermission === false && permissionAsked === true) {
      return null;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeRead={this.handleBarCodeRead}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }
}

QRScanner.propTypes = {
  navigator: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

QRScanner.defaultProps = {
  navigator: {
    push: () => {
    },
  },
};
