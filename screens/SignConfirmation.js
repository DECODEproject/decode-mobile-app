/* eslint-disable max-len */
import React from 'react';
import { Text, View, Linking, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToAuthorization } from '../application/redux/actions/navigation';
import styles from './styles';

const tick = require('../assets/images/decode_tick.jpg');

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
      <View style={styles.signConfirmationContainer}>
        <View style={styles.signConfirmationBox}>
          <Image
            style={styles.signConfirmationTick}
            source={tick}
          />
          <View style={styles.signConfirmationTextBox}>
            <Text style={styles.signConfirmationTextSubHeading}>Thank you for signing</Text>
            <Text style={styles.signConfirmationPetitionTitle}>Create communal space in Atlantis</Text>
            <Text style={styles.signConfirmationText}>You can view the results of the petition
              on the Secure Petitions website
            </Text>
            <Text
              style={styles.signConfirmationButtonText}
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
