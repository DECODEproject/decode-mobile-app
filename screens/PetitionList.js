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
  decidimClient: new DecidimClient(new LanguageService(), "https://betadddc.alabs.org/api/"),
};

const mapDispatchToProps = dispatch => ({
  goToNewAttributes: () => dispatch(goToNewAttributes()),
  goToPetition: (decidimClient, petitionId) => {
    dispatch(goToPetition(decidimClient, petitionId, false));
  },
});

export default translate('petitionList', { i18n })(connect(null, mapDispatchToProps)(PetitionList));
