import React from 'react';
import { Constants, SecureStore, WebBrowser } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet, Text, View, Linking, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPetition, signPetition } from '../application/redux/actions/petition';
import { addCredential } from '../application/redux/actions/attributes';
import VoteButton from '../application/components/VoteButton';
import { goToSignConfirmation } from '../application/redux/actions/navigation';
import AttributeComponent from '../application/components/Attribute';


const config = require('../config.json');

const walletProxyLink = config.development.walletProxy;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(246, 246, 246)',
    flex: 1,
  },
  petitionSummaryBox: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    padding: 10,
    margin: 16,
  },
  petitionTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  petitionDescription: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  closingDate: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 16,
    marginBottom: 10,
  },
  requiredText: {
    fontSize: 12,
    marginLeft: 16,
    marginTop: 10,
  },
});

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
    this.props.signPetition(petition, walletId, vote);
    this.props.goToSignConfirmation();
    this.setState({
      loading: false,
    });
  }

  render() {
    const isAttributeVerified = this.props.attributes.length > 0;

    const petitionView = (
      <View style={styles.petitionSummaryBox}>
        <Text style={styles.petitionTitle}>{this.props.petition.title}</Text>
        <Text style={styles.petitionDescription}>{this.props.petition.description}</Text>
        <Text style={styles.closingDate}>Closing date: {this.props.petition.closingDate}</Text>
      </View>
    );
    return (
      <View style={styles.container}>
        <ScrollView>
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
      </View>);
  }
}

PetitionSummary.propTypes = {
  goToSignConfirmation: PropTypes.func.isRequired,
  petitionLink: PropTypes.string.isRequired,
  petition: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    closingDate: PropTypes.string,
  }),
  addCredential: PropTypes.func.isRequired,
  getPetition: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  signPetition: PropTypes.func.isRequired,
};

PetitionSummary.defaultProps = {
  petition: undefined,
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
  petition: state.petition.petition,
  walletId: state.wallet.id,
  attributes: state.attributes,
});

const mapDispatchToProps = dispatch => ({
  getPetition: (petitionLink) => { dispatch(getPetition(petitionLink)); },
  addCredential: (attribute, walletId, url) => {
    dispatch(addCredential(attribute, walletId, url, SecureStore.setItemAsync));
  },
  goToSignConfirmation: () => { dispatch(goToSignConfirmation()); },
  signPetition: (petition, walletId, vote) => {
    dispatch(signPetition(petition, walletId, walletProxyLink, vote));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PetitionSummary);
