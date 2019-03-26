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
import { Text, FlatList, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Button from '../application/components/Button/Button';
import Logo from '../application/components/ScreenLogo/ScreenLogo';
import goToPetition from '../application/redux/actions/home';
import i18n from '../i18n';
import DecidimClient from '../lib/DecidimClient';
import LanguageService from '../lib/LanguageService';

class PetitionList extends React.Component {
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
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ fontSize: 16 }}>{this.props.t('description')}</Text>
        </View>
        <FlatList
          data={this.props.petitions}
          keyExtractor={p => p.id}
          renderItem={({item: petition}) =>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 2}}>
                <Text>{petition.title}</Text>
              </View>
              <View style={{flex: 1}}>
                <Button
                  name={this.props.t('go')}
                  onPress={() => this.props.goToPetition(this.props.decidimClient, petition.id)}
                />
              </View>
            </View>
          }
        />
      </View>
    );
  }
}

PetitionList.defaultProps = {
  petitions: [
    {
      "id": "1",
      "title": "¿Estas de acuerdo en tener más privacidad?",
    },
  ],
  decidimClient: new DecidimClient(new LanguageService(), "https://dddc.alabs.org/api/"),
};

const mapDispatchToProps = dispatch => ({
  goToNewAttributes: () => dispatch(goToNewAttributes()),
  goToPetition: (decidimClient, petitionId) => {
    dispatch(goToPetition(decidimClient, petitionId, false));
  },
});

export default translate('petitionList', { i18n })(connect(null, mapDispatchToProps)(PetitionList));
