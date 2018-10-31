import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Button from '../application/components/Button/Button';
import { getDecidimUrl } from '../config';
import styles from './styles';
import i18n from '../i18n';


const warningIcon = require('../assets/images/warning.png');

class Error extends React.Component {
  static handlePress() {
    Linking.openURL(getDecidimUrl());
  }

  buildOutcomeText() {
    const petitionError = this.props.petitionError === undefined ? this.props.t('defaultError') : this.props.petitionError;
    const signOutcomeText = `${petitionError} \n\n ${this.props.t('errorText')}`;
    return signOutcomeText;
  }

  render() {
    const signOutcomeText = this.buildOutcomeText();

    return (
      <View style={styles.signOutcomeContainer}>
        <View style={styles.signOutcomeBox}>
          <Image
            style={styles.signOutcomeIcon}
            source={warningIcon}
          />
          <View style={styles.signOutcomeTextBox}>
            <Text style={styles.signOutcomeText}>{signOutcomeText}</Text>
            <Button name={this.props.t('backDecidim')} onPress={Error.handlePress} />
          </View>
        </View>
      </View>
    );
  }
}

Error.propTypes = {
  t: PropTypes.func.isRequired,
  petitionError: PropTypes.string,
};

Error.defaultProps = {
  petitionError: undefined,
};

export default translate('signOutcome', { i18n })(Error); // TODO: Change translations to error key instead of SignOutcome
