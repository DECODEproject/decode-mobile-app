import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Router from '../Router';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgb(246, 246, 246)',
    flex: 1,
    paddingTop: 10,
  },
  textHeading: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  textContainer: {
    marginBottom: 30,
    padding: 10,
  },
  buttonBox: {
    width: 300,
  },
  textParagraph: {
    marginBottom: 15,
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
    shadowOffset: {width: 0, height: 2},
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
        <View style={styles.textContainer}>
          <Text style={styles.textHeading}>Secure Petitions is requesting
            to connect with your DECODE wallet</Text>
          <Text style={styles.textParagraph}>Secure Petitions may request access to
            the following information stored in your wallet.</Text>
          <Text style={styles.textParagraph}>- Verified Atlantis Resident</Text>
          <Text>Accepting this connection will not automatically share
            this information with Secure Petitions.</Text>
        </View>
        <TouchableOpacity
          style={styles.Button}
          onPress={this.goToPetitionSummaryGet}>
          <Text style={styles.buttonText}>AUTHORISE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Authorisation.propTypes = {
  navigator: PropTypes.shape({push: PropTypes.func.isRequired}),
};

Authorisation.defaultProps = {
  navigator: {
    push: () => {
    }
  },
};
