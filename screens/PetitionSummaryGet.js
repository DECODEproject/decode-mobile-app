import React from 'react';
import { Constants, WebBrowser } from 'expo';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import PropTypes from 'prop-types';
import Router from '../Router';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  logo: {
    height: 60,
    marginBottom: 30,
    width: 80,
  },
  textSubHeading: {
    alignSelf: 'flex-start',
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 10,
  },
  textContainer: {
    marginBottom: 30,
    padding: 10,
  },
  flatList: {
    marginTop: 15,
    marginBottom: 30,
  },
  buttonContainer: {
    width: 300,
  },
  textParagraph: {
    marginBottom: 15,
  },
  petitionSummary: {
    backgroundColor: '#EEE',
    width: 300,
  },
  petitionHeading: {
    fontSize: 14,
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
      `http://localhost:3000/?linkingUri=${Constants.linkingUri}`,
    );
    this.removeLinkingListener();
    this.setState({ result });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textSubHeading}>Petition Summary</Text>
        <View style={styles.petitionSummary}>
          <Text style={styles.petitionHeading}>Title</Text>
          <Text>Create communal space in Atlantis</Text>
          <Text style={styles.petitionHeading}>Created by</Text>
          <Text>John Bloggs, Atlantis Community College</Text>
          <Text style={styles.petitionHeading}>Closing date</Text>
          <Text>31 August 2020</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textParagraph}>To sign this petition you must be a resident
            of Atlantis. To demonstrate that you are a resident of Atlantis,
            you are required to share the
            following attribute with Secure Petitions when you sign the petition.</Text>

          <Text>You do not currently have this attribute
            in your wallet. Select
            Get Attribute below to be guided through the process of
            verifying your Atlantis Residency with
            Atlantis Council. You will only have to do this once,
            after which your Atlantis Residency attribute will
            be stored in your wallet ready for next time you need it.</Text>
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
  navigator: '',
};
