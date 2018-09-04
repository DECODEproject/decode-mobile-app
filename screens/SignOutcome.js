import React from 'react';
import { Text, View, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageOverlay from 'react-native-image-overlay';
import { translate } from 'react-i18next';
import openPetitionInBrowser from '../application/utils';
import styles from './styles';
import Button from '../application/components/Button/Button';
import Error from './Error';
import i18n from '../i18n';

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

  render() {
    if (!this.props.signSuccess) {
      return <Error title={this.props.petition.title} />;
    }
    return this.successful();
  }
}

SignOutcome.propTypes = {
  signSuccess: PropTypes.bool.isRequired,
  petition: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    closingDate: PropTypes.string,
    id: PropTypes.string,
  }),
  links: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

SignOutcome.defaultProps = {
  petition: undefined,
  links: [
    'Make Poblenou a car-free zone',
    'Reduce noise pollution'],
};

const mapStateToProps = state => ({
  signSuccess: state.signOutcome.signSuccess,
  petition: state.petition.petition,
});

const mapDispatchToProps = () => ({ });

export default translate('signOutcome', { i18n })(connect(mapStateToProps, mapDispatchToProps)(SignOutcome));
