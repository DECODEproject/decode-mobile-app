import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Router from '../Router';

const securePetitionsLogo = require('../assets/images/secure_petitions_logo.png');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgb(246, 246, 246)',
    flex: 1,
    paddingTop: 10,
  },
  textContainer: {
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonBox: {
    width: 300,
  },
  textParagraph: {
    textAlign: 'center',
  },
  Button: {
    alignSelf: 'center',
    backgroundColor: 'rgb(0,163,158)',
    borderRadius: 2,
    elevation: 2,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    shadowColor: 'rgba(0, 0, 0, 0.54)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 250,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
  },
  logo: {
    height: 35,
    alignSelf: 'center',
    marginBottom: 40,
    width: 210,
  },
  authorisationBox: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    margin: 16,
    marginTop: 40,
  },
});


export default class Authorisation extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      tintColor: 'rgb(0,163,158)',
      title: 'Authorise Connection',
    },
  }

  constructor(props) {
    super(props);
    this.goToPetitionSummaryGet = this.goToPetitionSummaryGet.bind(this);
  }

  goToPetitionSummaryGet() {
    this.props.navigator.push(Router.getRoute('petitionSummaryGet'));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.authorisationBox}>
          <Image
            style={styles.logo}
            source={securePetitionsLogo}
          />
          <View style={styles.textContainer}>
            <Text style={styles.textParagraph}>would like
            to connect with your DECODE wallet</Text>
          </View>
          <TouchableOpacity
            style={styles.Button}
            onPress={this.goToPetitionSummaryGet}
          >
            <Text style={styles.buttonText}>AUTHORISE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Authorisation.propTypes = {
  navigator: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

Authorisation.defaultProps = {
  navigator: {
    push: () => {
    },
  },
};
