import React from 'react';
import { Constants, SecureStore, WebBrowser } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, View, Linking, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPetition, signPetition } from '../application/redux/actions/petition';
import { setSignOutcome } from '../application/redux/actions/signOutcome';
import { addCredential } from '../application/redux/actions/attributes';
import VoteButton from '../application/components/VoteButton/VoteButton';
import { goToSignOutcome } from '../application/redux/actions/navigation';
import AttributeComponent from '../application/components/Attribute/Attribute';
import styles from './styles';


const config = require('../config.json');

const walletProxyLink = config.development.walletProxy;

class PetitionSummary extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      fontSize: 20,
      fontWeight: '500',
      tintColor: 'rgb(0,163,158)',
      title: 'Sign Petition',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.props.getPetition(this.props.petitionLink);
  }

  handleRedirect = (event) => {
    const { url } = event;
    const { petition, walletId } = this.props;

    this.props.addCredential(petition.attributes[0], walletId, url);

    WebBrowser.dismissBrowser();
  };

  openPetitionInBrowser = () => {
    const petitionUrl = `http://secure-petitions.s3-website-eu-west-1.amazonaws.com/#/${this.props.petition.id}`;
    Linking.openURL(petitionUrl);
  };

  openWebBrowserAsync = async () => {
    const queryParam = encodeURIComponent(Constants.linkingUri);
    const url = `http://atlantis-decode.s3-website-eu-west-1.amazonaws.com/#/?linkingUri=${queryParam}`;

    Linking.addEventListener('url', this.handleRedirect);
    await WebBrowser.openBrowserAsync(url);
    Linking.removeEventListener('url', this.handleRedirect);
  };

  async sign(petition, walletId, vote) {
    this.setState({
      loading: true,
    });

    let signSuccess;
    try {
      const signAction = await this.props.signPetition(petition, walletId, vote);
      signSuccess = (signAction.error === undefined);
    } catch (e) {
      signSuccess = false;
    }
    this.props.setSignOutcome(signSuccess);
    this.props.goToSignOutcome();
    this.setState({
      loading: false,
    });
  }

  render() {
    const isAttributeVerified = this.props.attributes.length > 0;

    const petitionView = (
      <View style={styles.petitionSummaryBox}>
        <Text style={styles.petitionSummaryPetitionTitle}>{this.props.petition.title}</Text>
        <Text style={styles.petitionDescription}>{this.props.petition.description}</Text>
        <Text style={styles.closingDate}>Closing date: {this.props.petition.closingDate}</Text>
      </View>
    );
    const petitionError = (
      <View style={styles.petitionSummaryErrorBox}>
        <Text style={styles.petitionErrorTitle}>Error</Text>
        <Text style={styles.petitionErrorDescription}>{this.props.petitionError}</Text>
      </View>
    );
    return (
      <View style={styles.petitionSummaryContainer}>
        <ScrollView>
          { this.props.petitionError && petitionError }
          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.loading} textStyle={{ color: '#FFF' }} />
          </View>
          { this.props.petition && petitionView }

          <Text style={styles.textTitle}>Your Information</Text>
          <AttributeComponent
            buttonCallback={this.openWebBrowserAsync}
            isVerified={isAttributeVerified}
          />
          <Text style={styles.requiredText}>*Required fields</Text>
        </ScrollView>
        <VoteButton
          enabled={isAttributeVerified}
          onPress={() => { this.sign(this.props.petition, this.props.walletId, 'Yes'); }}
          name="Yes"
        />
        <VoteButton
          enabled={isAttributeVerified}
          onPress={() => { this.sign(this.props.petition, this.props.walletId, 'No'); }}
          name="No"
        />
        <Text
          style={styles.cancelSigningPetition}
          onPress={this.openPetitionInBrowser}
        >Or, cancel signing this petition
        </Text>
      </View>);
  }
}

PetitionSummary.propTypes = {
  goToSignOutcome: PropTypes.func.isRequired,
  setSignOutcome: PropTypes.func.isRequired,
  petitionLink: PropTypes.string.isRequired,
  petition: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    closingDate: PropTypes.string,
  }),
  petitionError: PropTypes.string,
  addCredential: PropTypes.func.isRequired,
  getPetition: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  signPetition: PropTypes.func.isRequired,
};

PetitionSummary.defaultProps = {
  petition: undefined,
  petitionError: undefined,
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
  petition: state.petition.petition,
  petitionError: state.petition.error,
  walletId: state.wallet.id,
  attributes: state.attributes,
  signSuccess: state.signSuccess,
});

const mapDispatchToProps = dispatch => ({
  getPetition: (petitionLink) => { dispatch(getPetition(petitionLink)); },
  addCredential: (attribute, walletId, url) => {
    dispatch(addCredential(attribute, walletId, url, SecureStore.setItemAsync));
  },
  setSignOutcome: (signSuccess) => { dispatch(setSignOutcome(signSuccess)); },
  goToSignOutcome: () => { dispatch(goToSignOutcome()); },
  signPetition: (petition, walletId, vote) =>
    dispatch(signPetition(petition, walletId, walletProxyLink, vote)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PetitionSummary);
