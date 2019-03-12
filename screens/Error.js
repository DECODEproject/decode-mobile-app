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
import { Text, View, Image, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Button from '../application/components/Button/Button';
import Logo from '../application/components/ScreenLogo/ScreenLogo';
import { goToPetitionList } from '../application/redux/actions/navigation';
import styles from './styles';
import i18n from '../i18n';
import {getDisplayName} from "../lib/attributes";


const warningIcon = require('../assets/images/warning.png');

class Error extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
      borderBottomColor: 'white',
      elevation: 1,
      fontSize: 20,
      fontWeight: '500',
      tintColor: 'rgb(0,163,158)',
      renderTitle: () => <View  style={{marginLeft: Platform.OS === 'ios' ? -20 : -60,}} ><Logo/></View>,
      height: 80,
    },
  };

  render() {
    const {t, message, goToPetitionList, mandatoryAttributes} = this.props;
    const {provenance: {url: credentialIssuerUrl}} = mandatoryAttributes[0];
    return (
      <View style={styles.signOutcomeContainer}>
        <View style={styles.signOutcomeBox}>
          <Image
            style={styles.signOutcomeIcon}
            source={warningIcon}
          />
          <View style={styles.signOutcomeTextBox}>
            <Text style={styles.signOutcomeText}>{t(message) || t('defaultError')}</Text>
            {
              credentialIssuerUrl ?
                <Text style={styles.signOutcomeText}>{`${t('issuedBy')}:\n${getDisplayName('issuerName', t)}\n${credentialIssuerUrl}`}</Text>
                : null
            }
            <Button
              name={t('goOther')}
              onPress={() => goToPetitionList()}
              style={{
                width: 200,
                alignSelf: 'center',
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

Error.propTypes = {
  t: PropTypes.func.isRequired,
  message: PropTypes.string,
  issuer: PropTypes.object,
};

const mapStateToProps = state => ({
  mandatoryAttributes: state.petition.petition.attributes.mandatory,
});

const mapDispatchToProps = dispatch => ({
  goToPetitionList: () => dispatch(goToPetitionList()),
});

export default translate('error', { i18n })(connect(mapStateToProps, mapDispatchToProps)(Error));
