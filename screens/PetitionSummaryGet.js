/* eslint no-undef: 0 */

import React from 'react';
import { Constants, WebBrowser } from 'expo';
import { StyleSheet, Text, View, Linking, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToPetitionSummarySign } from '../application/redux/actions/navigation';
import { getPetition } from '../application/redux/actions/petition';

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
  attributeContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    padding: 16,
  },
  attributeName: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    fontWeight: '500',
  },
  attributeDetails: {
    color: 'rgba(0, 0, 0, 0.54)',
    marginVertical: 4,
  },
  requiredText: {
    fontSize: 12,
    marginLeft: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'rgb(0,163,158)',
    borderRadius: 2,
    elevation: 2,
    height: 36,
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: 'rgba(0, 0, 0, 0.54)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 100,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'rgb(255, 255, 255)',
    fontSize: 14,
    fontWeight: '500',
  },
  footerContainer: {
    height: 64,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  signButton: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,163,158,0.4)',
    borderRadius: 2,
    elevation: 2,
    height: 36,
    marginBottom: 18,
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: 'rgba(0, 0, 0, 0.54)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  disabledButtonText: {
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '500',
  },
});

class PetitionSummaryGet extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      fontSize: 20,
      fontWeight: '500',
      tintColor: 'rgb(0,163,158)',
      title: 'Sign Petition',
    },
  }

  constructor(props) {
    super(props);
    this.goToPetitionSummarySign = this.goToPetitionSummarySign.bind(this);
  }

  componentDidMount() {
    this.props.getPetition(this.props.petitionLink);
  }

  goToPetitionSummarySign() {
    this.props.goToPetitionSummarySign(this.props.petitionLink);
  }

  removeLinkingListener = () => {
    Linking.removeEventListener('url', this.handleRedirect);
  };

  addLinkingListener = () => {
    Linking.addEventListener('url', this.handleRedirect);
  };

  handleRedirect = (event) => {
    const { url } = event;
    // const petition = this.props.petition;
    // const walletId = this.props.walletId;
    // use action addCredentialFromUrl(petition, walletId, url);
    console.log(url, this.props.walletId);

    WebBrowser.dismissBrowser();

    this.goToPetitionSummarySign();
  };

  openWebBrowserAsync = async () => {
    const queryParam = encodeURIComponent(Constants.linkingUri);
    const url = `http://localhost:3010/#/?linkingUri=${queryParam}`;
    this.addLinkingListener();
    await WebBrowser.openBrowserAsync(url);
    this.removeLinkingListener();
  };

  render() {
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
          { this.props.petition && petitionView }

          <Text style={styles.textTitle}>Your Information</Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.attributeName}>Verified Atlantis Resident*</Text>
            <Text style={styles.attributeDetails}>To get this attribute you will be directed
              to the Atlantis Council website
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={this.openWebBrowserAsync}
            >
              <Text style={styles.buttonText}>REQUEST</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.requiredText}>*Required fields</Text>
        </ScrollView>
        <View style={styles.footerContainer}>
          <View style={styles.signButton}>
            <Text style={styles.disabledButtonText}>SIGN PETITION</Text>
          </View>
        </View>
      </View>
    );
  }
}

PetitionSummaryGet.propTypes = {
  petitionLink: PropTypes.string.isRequired,
  petition: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    closingDate: PropTypes.string,
  }),
  goToPetitionSummarySign: PropTypes.func.isRequired,
  getPetition: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
};

PetitionSummaryGet.defaultProps = {
  petition: undefined,
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
  petition: state.petition.petition,
  walletId: state.wallet.id,
});

const mapDispatchToProps = dispatch => ({
  goToPetitionSummarySign: (petitionLink) => { dispatch(goToPetitionSummarySign(petitionLink)); },
  getPetition: (petitionLink) => { dispatch(getPetition(petitionLink)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PetitionSummaryGet);
