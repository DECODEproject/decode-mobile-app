/*
 * DECODE App – A mobile app to control your personal data
 * Copyright (C) 2019 – Thoughtworks Ltd.
 * Copyright (C) 2019 – DRIBIA Data Research S.L.
 *
 * DECODE App is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DECODE App is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * email: ula@dribia.com
 */

import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Button from '../application/components/Button/Button';
import Logo from '../application/components/ScreenLogo/ScreenLogo';
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
        <Logo/>
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
