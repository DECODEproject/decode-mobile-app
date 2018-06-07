/* eslint-disable max-len */
import React from 'react';
import { Text, View, Linking, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageOverlay from 'react-native-image-overlay';
import { goToAuthorization } from '../application/redux/actions/navigation';
import styles from './styles';
import Button from '../application/components/Button/Button';

const warningIcon = require('../assets/images/warning.png');
const successImage = require('../assets/images/city.png');

const linksStyle = {
  textAlign: 'left',
  color: '#00F',
  fontSize: 16,
  fontWeight: 'bold',
  textDecorationLine: 'underline',
  marginVertical: 10,
};

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

  static createLink(linkText, index) {
    return (
      <Text
        key={index}
        style={linksStyle}
        onPress={() => { alert('End MVP'); }} // eslint-disable-line
      >
        {linkText}
      </Text>);
  }

  constructor(props) {
    super(props);
    this.goToHome = this.goToHome.bind(this);
  }

  goToHome() {
    this.props.goToAuthorization(this.props.petitionLink);
  }

  successful() {
    const links = this.props.links.map(SignOutcome.createLink);

    return (
      <View style={styles.signOutcomeContainer}>
        <ImageOverlay
          source={successImage}
          overlayAlpha={0}
          contentPosition="bottom"
        >
          <Text
            style={{
              fontSize: 34,
              color: 'white',
              marginBottom: 30,
              marginLeft: 20,
              marginRight: 20,
              textAlign: 'center',
              backgroundColor: 'transparent',
            }}
          >
            Your vote has been recorded anonymously
          </Text>
        </ImageOverlay>
        <View style={{
          marginTop: 30,
          flex: 1,
        }}
        >
          <Text style={{
            marginBottom: 20,
            fontSize: 16,
          }}
          >
            You may interested in these other petitions
          </Text>

          {links}
        </View>
        <Button
          name="Back to Decidim"
          onPress={SignOutcome.handlePress}
          style={{
            flex: 0,
            width: 200,
            alignSelf: 'center',
            marginBottom: 80,
          }}
        />
      </View>
    );
  }

  error() {
    const textSubHeading = 'Sign failed for';
    const signOutcomeText = `${this.props.petitionError} \n\nYou can return to the Decidim site to view other active petitions.`;

    return (
      <View style={styles.signOutcomeContainer}>
        <View style={styles.signOutcomeBox}>
          <Image
            style={styles.signOutcomeIcon}
            source={warningIcon}
          />
          <View style={styles.signOutcomeTextBox}>
            <Text style={styles.signOutcomeTextSubHeading}>{textSubHeading}</Text>
            <Text style={styles.signOutcomePetitionTitle}>{this.props.petition.title}</Text>
            <Text style={styles.signOutcomeText}>{signOutcomeText}</Text>
            <Button name="Back to home" onPress={SignOutcome.handlePress} />
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (!this.props.signSuccess) {
      return this.error();
    }
    return this.successful();
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
  links: PropTypes.arrayOf(PropTypes.string),
};

SignOutcome.defaultProps = {
  petition: undefined,
  petitionError: undefined,
  links: [
    'Make Poblenou a car-free zone',
    'Ban diesel engines from the city',
    'More street lighting for the old town',
    'Reduce noise pollution'],
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
