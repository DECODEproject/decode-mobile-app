/* eslint no-undef: 0 */

import React from 'react';
import { Constants, WebBrowser, SecureStore } from 'expo';
import { StyleSheet, Text, View, Linking, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToPetitionSummarySign } from '../application/redux/actions/navigation';
import { getPetition } from '../application/redux/actions/petition';
import { addCredential } from '../application/redux/actions/attributes';
import AttributeComponent from '../application/components/Attribute';

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
  };

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
    const { petition, walletId } = this.props;

    addCredential(petition.attributes, walletId, url, SecureStore.setItemAsync);

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
          <AttributeComponent
            buttonCallback={this.openWebBrowserAsync}
            isVerified={false}
          />
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
