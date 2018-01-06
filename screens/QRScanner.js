import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';


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

  handleBarCodeRead = async (obj) => {
    await delay(500);
    if (this.state.read === obj.data) return;
    this.setState({ read: obj.data });
    Alert.alert(`Barcode with type ${obj.type} and data ${obj.data} has been scanned`);
  };

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
