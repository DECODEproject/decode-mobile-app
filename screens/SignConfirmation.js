import React from 'react';
import { StyleSheet, Text, View, Linking, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToAuthorization } from '../application/redux/actions/navigation';

const tick = require('../assets/images/decode_tick.jpg');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgb(246, 246, 246)',
    flex: 1,
  },
  confirmationBox: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 40,
    margin: 16,
    marginTop: 30,
  },
  tick: {
    alignSelf: 'center',
    height: 75,
    marginBottom: 40,
    width: 75,
  },
  textBox: {
    alignSelf: 'center',
    width: 250,
  },
  textSubHeading: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  petitionTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 15,
    textAlign: 'center',
  },
  confirmationText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'rgb(0,163,158)',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

class SignConfirmation extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      tintColor: 'rgb(0,163,158)',
      title: 'Confirmation',
    },
  }

  static handlePress() {
    Linking.openURL('http://secure-petitions.s3-website-eu-west-1.amazonaws.com/#/results/59f888c8ce33c76884e8cf16');
  }

  constructor(props) {
    super(props);
    this.goToHome = this.goToHome.bind(this);
  }

  goToHome() {
    this.props.goToAuthorization(this.props.petitionLink);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.confirmationBox}>
          <Image
            style={styles.tick}
            source={tick}
          />
          <View style={styles.textBox}>
            <Text style={styles.textSubHeading}>Thank you for signing</Text>
            <Text style={styles.petitionTitle}>Create communal space in Atlantis</Text>
            <Text style={styles.confirmationText}>You can view the results of the petition
              on the Secure Petitions website
            </Text>
            <Text
              style={styles.buttonText}
              onPress={SignConfirmation.handlePress}
            >View Petitions Results
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

SignConfirmation.propTypes = {
  petitionLink: PropTypes.string.isRequired,
  goToAuthorization: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
});

const mapDispatchToProps = dispatch => ({
  goToAuthorization: () => { dispatch(goToAuthorization()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignConfirmation);
