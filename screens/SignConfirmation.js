import React from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import PropTypes from 'prop-types';
import Router from '../Router';


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 10,
  },
  logo: {
    height: 60,
    marginBottom: 30,
    width: 80,
  },
  textHeading: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  textContainer: {
    marginBottom: 30,
    width: 300,
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
  PetitionSummary: {
    backgroundColor: '#EEE',
    width: 300,
  },
  textSubHeading: {
    fontSize: 16,
  },
});

export default class SignConfirmation extends React.Component {
  static route = {
    navigationBar: {
      tintColor: 'rgb(0,163,158)',
      title: 'Confirmation',
    },
  }

  constructor(props) {
    super(props);
    this.goToHome = this.goToHome.bind(this);
  }

  goToHome() {
    this.props.navigator.push(Router.getRoute('home'));
  }

  handlePress() {
    Linking.openURL('http://localhost:8080/#/59f888c8ce33c76884e8cf16');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textSubHeading}>Thank you for signing</Text>
        <Text style={styles.textHeading}>Create communal space in Atlantis</Text>
        <Text style={styles.textParagraph}>You can view the results of
        the petition by returning to Secure Petitions</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.goToHome}
            title="Return to Secure Petitions"
            color="rgb(0,163,158)"
          />
        </View>
        <Text onPress={this.handlePress}>
          CLICK HERE
        </Text>
      </View>
    );
  }
}
SignConfirmation.propTypes = {
  navigator: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

SignConfirmation.defaultProps = {
  navigator: '',
};

