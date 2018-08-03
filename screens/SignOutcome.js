import React from 'react';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageOverlay from 'react-native-image-overlay';
import { translate } from 'react-i18next';
import { goToAuthorization } from '../application/redux/actions/navigation';
import openPetitionInBrowser from '../application/utils';
import styles from './styles';
import Button from '../application/components/Button/Button';
import i18n from '../i18n';

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
  };

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
            { this.props.t('voteRecorded')}
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
            {this.props.t('maybeInterested')}
          </Text>

          {links}
        </View>
        <Button
          name={this.props.t('backDecidim')}
          onPress={() => openPetitionInBrowser(this.props.petition.id)}
          style={{
            width: 200,
            alignSelf: 'center',
          }}
        />
      </View>
    );
  }

  error() {
    const textSubHeading = this.props.t('errorTitle');
    const signOutcomeText = `${this.props.petitionError} \n\n ${this.props.t('errorText')}`;

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
            <Button name={this.props.t('backHome')} onPress={SignOutcome.handlePress} />
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
    id: PropTypes.string,
  }),
  petitionError: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

SignOutcome.defaultProps = {
  petition: undefined,
  petitionError: undefined,
  links: [
    'Make Poblenou a car-free zone',
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

export default translate('signOutcome', { i18n })(connect(mapStateToProps, mapDispatchToProps)(SignOutcome));
