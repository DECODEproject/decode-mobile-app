import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { SecureStore } from 'expo';
import PropTypes from 'prop-types';
import { goQRScannerIntro, goToAuthorization } from '../application/redux/actions/navigation';
import { onStartApp } from '../application/redux/actions/petitionLink';
import { loadCredentials } from '../application/redux/actions/attributes';
import { getWalletId } from '../application/redux/actions/wallet';

const decodeLogo = require('../assets/images/decode_logo.jpg');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  logo: {
    height: 150,
    marginTop: 75,
    marginBottom: 50,
    width: 300,
  },
  welcomeMessage: {
    fontSize: 18,
    marginBottom: 30,
  },
  textInput: {
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    borderColor: 'rgb(0,163,158)',
    marginBottom: 20,
  },
  password: {
    height: Platform.OS === 'ios' ? 30 : 40,
    width: 300,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'rgb(0,163,158)',
    borderRadius: 2,
    elevation: 2,
    height: 36,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: 'rgba(0, 0, 0, 0.54)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 300,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.goToNextPage = this.goToNextPage.bind(this);
  }

  componentWillMount() {
    this.props.initializeState().then(() => {});
  }

  goToNextPage() {
    if (this.props.petitionLink) {
      this.props.goToAuthorization(this.props.petitionLink);
    } else {
      this.props.goQRScannerIntro();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={decodeLogo}
        />
        <Text style={styles.welcomeMessage}>Welcome, Jane Doe</Text>
        <View style={styles.textInput}>
          <TextInput
            style={styles.password}
            placeholder="Password"
            secureTextEntry
            underlineColorAndroid="rgb(0,163,158)"
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.goToNextPage}
        >
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

Home.propTypes = {
  goQRScannerIntro: PropTypes.func.isRequired,
  goToAuthorization: PropTypes.func.isRequired,
  initializeState: PropTypes.func.isRequired,
  petitionLink: PropTypes.string,
};

Home.defaultProps = {
  petitionLink: undefined,
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
});

const mapDispatchToProps = dispatch => ({
  goQRScannerIntro: () => { dispatch(goQRScannerIntro()); },
  goToAuthorization: (petitionLink) => { dispatch(goToAuthorization(petitionLink)); },
  initializeState: async () => {
    await dispatch(onStartApp());
    await dispatch(getWalletId());
    await dispatch(loadCredentials(SecureStore.getItemAsync));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

