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
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToPetitionSummary } from '../application/redux/actions/navigation';
import Button from '../application/components/Button/Button';
import styles from './styles';

class Authorisation extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      tintColor: 'rgb(0,163,158)',
      title: 'Authorise Connection',
    },
  };

  constructor(props) {
    super(props);
    this.goToPetitionSummary = this.goToPetitionSummary.bind(this);
  }

  goToPetitionSummary() {
    this.props.goToPetitionSummary();
  }

  render() {
    return (
      <View style={styles.authorisationContainer}>
        <View style={styles.authorisationBox}>
          <Text style={styles.authorisationBoxLogo}>SECURE PETITIONS</Text>
          <Text style={styles.authorisationBoxTextParagraph}>would like
            to connect with your DECODE wallet
          </Text>
          <Button name="AUTHORISE" onPress={this.goToPetitionSummary} />
        </View>
        <Text style={styles.authorisationBoxId}>Wallet ID: {this.props.walletId}</Text>
      </View>
    );
  }
}

Authorisation.propTypes = {
  goToPetitionSummary: PropTypes.func.isRequired,
  walletId: PropTypes.string,
};

Authorisation.defaultProps = {
  walletId: '',
};

const mapStateToProps = state => ({
  walletId: state.wallet.id,
});

const mapDispatchToProps = dispatch => ({
  goToPetitionSummary: () => { dispatch(goToPetitionSummary()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorisation);
