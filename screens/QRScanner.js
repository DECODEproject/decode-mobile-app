/* eslint no-undef: 0 */

import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPetitionLink } from '../application/redux/actions/petitionLink';
import { goToAuthorization } from '../application/redux/actions/navigation';

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
}

class QRScanner extends React.Component {
  static route = {
    navigationBar: {
      tintColor: 'rgb(0,163,158)',
      title: 'QR Scanner',
    },
  }

  static getURL(url) {
    const myURL = new URL(url, true);
    const { query: { petitionLink } } = myURL;

    this.props.setPetitionLink(petitionLink);
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

  handleBarCodeRead = async ({ data }) => {
    await delay(500);
    if (this.state.read === true) return;
    this.getURL(data);
    this.setState({ read: true });
    this.props.goToAuthorization(this.props.petitionLink);
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
  goToAuthorization: PropTypes.func.isRequired,
  setPetitionLink: PropTypes.func.isRequired,
  petitionLink: PropTypes.string,
};

QRScanner.defaultProps = {
  petitionLink: undefined,
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
});

const mapDispatchToProps = dispatch => ({
  goToAuthorization: (petitionLink) => { dispatch(goToAuthorization(petitionLink)); },
  setPetitionLink: (petitionLink) => { dispatch(setPetitionLink(petitionLink)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(QRScanner);

