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
import { Text, TextInput, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import i18n from '../i18n';
import Button from '../application/components/Button/Button';
import NavigationBar from '../application/components/NavigationBar';
import {saveDeviceName, updateDeviceName, findCommunities} from '../application/redux/actions/device';


class Device extends React.Component {
  static route = NavigationBar;

  render() {
    const {
      loading,
      name,
      device: {token},
      updateDeviceName,
      saveDeviceName,
      editingName,
      step,
      findCommunities,
      communities,
      error,
    } = this.props;
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <View>
          <Spinner visible={loading} textStyle={{color: '#FFF'}} />
        </View>
        <View style={{ paddingVertical: 20 }}>
          <Text>{`Configuring device ${token}`}</Text>
        </View>
        {
          editingName ?
            <View>
              <TextInput
                style={styles.inputText}
                value={name}
                onChangeText={value => updateDeviceName(value)}
              />
              <Button
                name={'Save name'}
                onPress={() => saveDeviceName()}
              />
            </View>
            :
            <Text>{name}</Text>
        }
        {
          step === 2 ?
            <View>
              {
                communities.length ?
                  null
                  : <Button
                    name={'Find your community'}
                    onPress={() => findCommunities()}
                  />
              }
              {
                error ?
                  <Text>{error}</Text>
                  : null
              }
              {
                communities.length ?
                  <View>
                    {
                      communities.map(({community_id, label, descriptions: {en: desc}}) => (
                        <View key={community_id}>
                          <Text>- {label}</Text>
                          <Text>{desc}</Text>
                        </View>
                      ))
                    }
                    <Button
                      name={'Choose your community'}
                      onPress={() => findCommunities()}
                    />
                  </View>
                  : null
              }
            </View>
            : null
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.device.loading,
  device: state.device.device,
  name: state.device.name,
  editingName: state.device.editingName,
  step: state.device.configStep,
  error: state.device.error,
  communities: state.device.communities,
});

const mapDispatchToProps = dispatch => ({
  updateDeviceName: name => dispatch(updateDeviceName(name)),
  saveDeviceName: name => dispatch(saveDeviceName(name)),
  findCommunities: () => dispatch(findCommunities()),
});

export default translate('device', { i18n })(connect(mapStateToProps, mapDispatchToProps)(Device));
