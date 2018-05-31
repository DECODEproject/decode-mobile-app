import React from 'react';
import { connect } from 'react-redux';
import { Image, Text, TextInput, View } from 'react-native';
import { SecureStore } from 'expo';
import PropTypes from 'prop-types';
import { goQRScannerIntro, goToAuthorization } from '../application/redux/actions/navigation';
import { onStartApp } from '../application/redux/actions/petitionLink';
import { loadCredentials } from '../application/redux/actions/attributes';
import { getWalletId } from '../application/redux/actions/wallet';
import Button from '../application/components/Button/Button';

import styles from './styles';

const decodeLogo = require('../assets/images/decode_logo.jpg');

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
      <View style={styles.homeContainer}>
        <Image
          style={styles.homeLogo}
          source={decodeLogo}
        />
        <Text style={styles.homeWelcomeMessage}>Welcome, Jane Doe</Text>
        <View style={styles.homeTextInput}>
          <TextInput
            style={styles.homePassword}
            placeholder="Password"
            secureTextEntry
            underlineColorAndroid="rgb(0,163,158)"
          />
        </View>
        <Button name="LOG IN" onPress={this.goToNextPage} />
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

