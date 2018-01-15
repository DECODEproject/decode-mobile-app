import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Router from '../Router';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(246, 246, 246)',
    flex: 1,
  },
  petitionSummaryContainer: {
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
  paragraph: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  caption: {
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
    paddingBottom: 16,
  },
  attributeName: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 16,
    marginTop: 16,
    marginRight: 16,
  },
  attributeDetails: {
    color: 'rgba(0, 0, 0, 0.54)',
    marginBottom: 4,
    marginLeft: 16,
    marginTop: 4,

  },
  footerContainer: {
    height: 64,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  signButton: {
    alignSelf: 'stretch',
    backgroundColor: 'rgb(0,163,158)',
    borderRadius: 2,
    elevation: 2,
    height: 36,
    marginBottom: 18,
    marginTop: 10,
    marginRight: 16,
    marginLeft: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    shadowColor: 'rgba(0, 0, 0, 0.54)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
  },
  requiredText: {
    color: 'red',
    marginLeft: 16,
    marginTop: 8,
  },
});

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
    this.goToSignConfirmation = this.goToSignConfirmation.bind(this);
  }

  goToSignConfirmation() {
    this.props.navigator.push(Router.getRoute('signConfirmation'));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.petitionSummaryContainer}>
            <Text style={styles.petitionTitle}>Create communal Space in Atlantis</Text>
            <Text style={styles.paragraph}>Availability fairbnb cryptographic modelling data
              ontology pilots. Availability fairbnbcryptography
              hello. Availability fairbnb. Availability fairbnb</Text>
            <Text style={styles.caption}>Closing: 28 October 2018</Text>
          </View>
          <Text style={styles.textTitle}>Your Information</Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.attributeName}>Verified resident of Atlantis</Text>
            <Text style={styles.attributeDetails}>To get this attribute you will be directed
              to the Atlantis Council website</Text>
            <Text style={styles.requiredText}>REQUIRED</Text>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.signButton}
            onPress={this.goToSignConfirmation}
          >
            <Text style={styles.buttonText}>SIGN PETITION</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

PetitionSummaryGet.propTypes = {
  navigator: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

PetitionSummaryGet.defaultProps = {
  navigator: {
    push: () => {
    },
  },
};
