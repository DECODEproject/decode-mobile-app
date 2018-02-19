/* eslint no-undef: 0 */

import React from 'react';
import { Constants, WebBrowser } from 'expo';
import { StyleSheet, Text, View, Linking, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Router from '../Router';

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

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export default class PetitionSummaryGet extends React.Component {
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
    this.state = {
      petition: {},
      loading: true,
      serverError: false,
    };
  }

  componentDidMount() {
    return fetch(this.props.route.params.petitionLink)
      .then(handleErrors)
      .then(response => response.json())
      .then(petition => this.setState({ loading: false, petition }))
      .catch(() => this.setState({ loading: false, serverError: true }));
  }

  goToPetitionSummarySign() {
    this.props.navigator.push(Router.getRoute('petitionSummarySign', { petitionLink: this.props.route.params.petitionLink }));
  }

  removeLinkingListener = () => {
    Linking.removeEventListener('url', this.handleRedirect);
  };

  addLinkingListener = () => {
    Linking.addEventListener('url', this.handleRedirect);
  };

  handleRedirect = () => {
    WebBrowser.dismissBrowser();
    this.goToPetitionSummarySign();
  };

  openWebBrowserAsync = async () => {
    const queryParam = encodeURIComponent(Constants.linkingUri);
    const url = `http://atlantis-decode.s3-website-eu-west-1.amazonaws.com/#/?linkingUri=${queryParam}`;

    this.addLinkingListener();
    const result = await WebBrowser.openBrowserAsync(url);
    this.removeLinkingListener();
    this.setState({ result });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.petitionSummaryBox}>
            <Text style={styles.petitionTitle}>{this.state.petition.title}</Text>
            <Text style={styles.petitionDescription}>{this.state.petition.description}</Text>
            <Text style={styles.closingDate}>Closing date: {this.state.petition.closingDate}</Text>
          </View>
          <Text style={styles.textTitle}>Your Information</Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.attributeName}>Verified Atlantis Resident*</Text>
            <Text style={styles.attributeDetails}>To get this attribute you will be directed
              to the Atlantis Council website</Text>
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
  navigator: PropTypes.shape({ push: PropTypes.func.isRequired }),
  route: PropTypes.shape({ params: PropTypes.object }),
};

PetitionSummaryGet.defaultProps = {
  navigator: {
    push: () => {
    },
  },
  route: {
    params: {
    },
  },
};
