import React from 'react';
import { Constants, WebBrowser } from 'expo';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import PropTypes from 'prop-types';
import Router from '../Router';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 10,
  },
  buttonContainer: {
    width: 300,
  },
  textParagraph: {
    marginBottom: 10,
  },
  textContainer: {
    marginBottom: 10,
    padding: 10,
  },
  petitionHeading: {
    fontSize: 16,
    marginBottom: 10,

  },
  petitionLabel: {
    color: '#9B9B9B',
  },
  petitionSummary: {
    alignSelf: 'stretch',
    borderBottomWidth: 3,
    borderBottomColor: '#EFEFF2',
    padding: 10,
  },
  attributeDetails: {
    color: '#9B9B9B',
  },
});

export default class PetitionSummaryGet extends React.Component {
  static route = {
    navigationBar: {
      tintColor: 'rgb(0,163,158)',
      title: 'Sign Petition',
    },
  }

  constructor(props) {
    super(props);
    this.goToPetitionSummarySign = this.goToPetitionSummarySign.bind(this);
  }

  goToPetitionSummarySign() {
    this.props.navigator.push(Router.getRoute('petitionSummarySign'));
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
    this.addLinkingListener();
    const result = await WebBrowser.openBrowserAsync(
      `http://localhost:3010/?linkingUri=${Constants.linkingUri}`,
    );
    this.removeLinkingListener();
    this.setState({ result });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.petitionSummary}>
          <Text style={styles.petitionHeading}>Petition Summary</Text>
          <Text style={styles.petitionLabel}>Title</Text>
          <Text>Create communal space in Atlantis</Text>
          <Text style={styles.petitionLabel}>Created by</Text>
          <Text>John Bloggs, Atlantis Community College</Text>
          <Text style={styles.petitionLabel}>Closing date</Text>
          <Text>31 August 2020</Text>
          <Text style={styles.petitionLabel}>Information</Text>
          <Text>To sign this petition you must be a verified resident of Atlantis</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textParagraph}>Please select the information
          that you would like to share with Secure Petitions</Text>
          <Text style={styles.attributeLabel}>REQUIRED</Text>
          <Text>- Verified Atlantis Resident</Text>
          <Text style={styles.attributeDetails}>You do not currently have this
          attribute in your wallet. To get this attribute you will be
          directed to the Atlantis Council website. </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.openWebBrowserAsync}
            title="Get Attribute"
            color="rgb(0,163,158)"
          />
        </View>
      </View>
    );
  }
}

PetitionSummaryGet.propTypes = {
  navigator: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

PetitionSummaryGet.defaultProps = {
  navigator: { push: () => {} },
};
