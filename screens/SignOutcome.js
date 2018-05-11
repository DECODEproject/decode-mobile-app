/* eslint-disable max-len */
import React from 'react';
import { Text, View, Linking, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToAuthorization } from '../application/redux/actions/navigation';
import styles from './styles';

const tickIcon = require('../assets/images/decode_tick.jpg');
const warningIcon = require('../assets/images/warning.png');


class SignOutcome extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      tintColor: 'rgb(0,163,158)',
      title: 'Outcome',
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
    let textSubHeading = 'Thank you for signing';
    let signOutcomeText = 'You can view the results of the petition on the Secure Petitions website';
    let signOutcomeButtonText = 'View Petitions Results';
    let icon = tickIcon;
    if (!this.props.signSuccess) {
      textSubHeading = 'Sign failed for';
      signOutcomeText = `Reason: ${this.props.petitionError} \n\nYou can return to view other petitions on the Secure Petitions website`;
      signOutcomeButtonText = 'View Other Petitions';
      icon = warningIcon;
    }

    return (
      <View style={styles.signOutcomeContainer}>
        <View style={styles.signOutcomeBox}>
          <Image
            style={styles.signOutcomeIcon}
            source={icon}
          />
          <View style={styles.signOutcomeTextBox}>
            <Text style={styles.signOutcomeTextSubHeading}>{textSubHeading}</Text>
            <Text style={styles.signOutcomePetitionTitle}>{this.props.petition.title}</Text>
            <Text style={styles.signOutcomeText}>{signOutcomeText}</Text>
            <Text
              style={styles.signOutcomeButtonText}
              onPress={SignOutcome.handlePress}
            >{signOutcomeButtonText}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

SignOutcome.propTypes = {
  petitionLink: PropTypes.string.isRequired,
  goToAuthorization: PropTypes.func.isRequired,
  signSuccess: PropTypes.bool.isRequired,
  petition: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    closingDate: PropTypes.string,
  }),
  petitionError: PropTypes.string,
};

SignOutcome.defaultProps = {
  petition: undefined,
  petitionError: undefined,
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
  signSuccess: state.signOutcome.signSuccess,
  petition: state.petition.petition,
  petitionError: state.petition.error,
});

const mapDispatchToProps = dispatch => ({
  goToAuthorization: () => { dispatch(goToAuthorization()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignOutcome);
