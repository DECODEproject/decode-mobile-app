import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Button from '../application/components/Button/Button';
import styles from './styles';
import i18n from '../i18n';


const warningIcon = require('../assets/images/warning.png');

class Error extends React.Component {
  static handlePress() {
    Linking.openURL('http://secure-petitions.s3-website-eu-west-1.amazonaws.com/#/results/59f888c8ce33c76884e8cf16');
  }

  render() {
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
            <Text style={styles.signOutcomePetitionTitle}>{this.props.title}</Text>
            <Text style={styles.signOutcomeText}>{signOutcomeText}</Text>
            <Button name={this.props.t('backHome')} onPress={Error.handlePress} />
          </View>
        </View>
      </View>
    );
  }
}

Error.propTypes = {
  title: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  petitionError: PropTypes.string,
};

Error.defaultProps = {
  petitionError: undefined,
};

export default translate('signOutcome', { i18n })(Error); // TODO: Change translations to error key instead of SignOutcome
