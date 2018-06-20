import React from 'react';
import { connect } from 'react-redux';
import { Image, Text, TextInput, View, KeyboardAvoidingView } from 'react-native';
import { SecureStore, ScreenOrientation } from 'expo';
import PropTypes from 'prop-types';
import { goQRScannerIntro, goToAttributesSummary, goToPetitionSummary } from '../application/redux/actions/navigation';
import { onStartApp } from '../application/redux/actions/petitionLink';
import { loadCredentials } from '../application/redux/actions/attributes';
import { getWalletId } from '../application/redux/actions/wallet';
import authorizationAction, { updatePin } from '../application/redux/actions/authorization';
import { storePinOnAppInitalization } from '../LocalStorage';
import Button from '../application/components/Button/Button';


import styles from './styles';

const decodeLogo = require('../assets/images/decode-hexagon.png');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.validatePinCode = this.validatePinCode.bind(this);
  }

  componentWillMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP);
    this.props.initializeState().then(() => {});
  }

  goToPetition() {
    const isAttributeVerified = this.props.attributes.list.length > 0;
    if (isAttributeVerified) {
      this.props.goToPetitionSummary(this.props.petitionLink);
    } else {
      this.props.goToAttributesSummary(this.props.petitionLink);
    }
  }

  goToNextPage() {
    if (this.props.petitionLink) {
      this.goToPetition();
    } else {
      this.props.goQRScannerIntro();
    }
  }

  validatePinCode() {
    return this.props.doAuthorize(this.props.pinCode).then((action) => {
      if (action.pinCorrect) {
        this.goToNextPage();
      } else {
        alert('Incorrect pin code'); // eslint-disable-line
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={50}
      >
        <View style={styles.homeContainer}>
          <Image
            style={styles.homeLogo}
            source={decodeLogo}
          />
          <View style={styles.homeTextInput}>
            <Text style={{ marginVertical: 10 }}>PIN:&nbsp;&nbsp;</Text>
            <TextInput
              style={styles.homePassword}
              placeholder=" Pin"
              secureTextEntry
              underlineColorAndroid="transparent"
              onChangeText={pin => this.props.updatePin(pin)}
              value={this.props.pinCode}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button
              name="Sign In"
              onPress={this.validatePinCode}
              style={{
                width: 150,
                alignItems: 'center',
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

Home.propTypes = {
  goQRScannerIntro: PropTypes.func.isRequired,
  goToAttributesSummary: PropTypes.func.isRequired,
  goToPetitionSummary: PropTypes.func.isRequired,
  initializeState: PropTypes.func.isRequired,
  doAuthorize: PropTypes.func.isRequired,
  updatePin: PropTypes.func.isRequired,
  petitionLink: PropTypes.string,
  pinCode: PropTypes.string,
  attributes: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

Home.defaultProps = {
  petitionLink: undefined,
  pinCode: '',
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
  pinCode: state.authorization.pin,
  attributes: state.attributes,
});

const mapDispatchToProps = dispatch => ({
  goQRScannerIntro: () => { dispatch(goQRScannerIntro()); },
  goToAttributesSummary: (petitionLink) => { dispatch(goToAttributesSummary(petitionLink)); },
  goToPetitionSummary: (petitionLink) => { dispatch(goToPetitionSummary(petitionLink)); },
  doAuthorize: pin => dispatch(authorizationAction(pin, SecureStore.getItemAsync)),
  updatePin: (pin) => { dispatch(updatePin(pin)); },
  initializeState: async () => {
    await dispatch(onStartApp());
    await dispatch(getWalletId());
    await storePinOnAppInitalization(SecureStore.setItemAsync);
    await dispatch(loadCredentials(SecureStore.getItemAsync));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

