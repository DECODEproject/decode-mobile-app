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
import { Font, ScreenOrientation, SecureStore } from 'expo';
import { Provider } from 'react-redux';
import { YellowBox } from 'react-native';
import {
  NavigationProvider,
  StackNavigation,
  NavigationContext,
} from '@expo/ex-navigation';
import Router from './Router';
import Store from './application/redux/store';
import { initialiseWalletID, retrievePin } from './LocalStorage';

const montserratMedium = require('./assets/fonts/Montserrat-Medium.ttf');
const latoBold = require('./assets/fonts/Lato-Bold.ttf');

const navigationContext = new NavigationContext({
  router: Router,
  store: Store,
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      initialRoute: '',
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Montserrat-Medium': montserratMedium,
      'Lato-Bold': latoBold,
    });

    await initialiseWalletID();
    await this.goToInitialScreen(
      () => retrievePin(SecureStore.getItemAsync),
      routeName => Router.getRoute(routeName),
    );

    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
    YellowBox.ignoreWarnings(['Class EXHomeModule', 'Class EXTest', 'Class EXDisabledDevMenu', 'Class EXDisabledRedBox']);

    this.setState({
      ready: true,
    });
  }


  async goToInitialScreen(retrievePinFunc, routerFunc) { // eslint-disable-line
    try {
      return retrievePinFunc().then((pin) => {
        if (pin !== undefined && pin !== null) {
          this.setState({
            initialRoute: routerFunc('home'),
          });
        } else {
          this.setState({
            initialRoute: routerFunc('walkthrough'),
          });
        }
      });
    } catch (e) {
      this.setState({
        initialRoute: routerFunc('walkthrough'),
      });
    }
  }

  render() {
    if (this.state.ready) {
      return (
        <Provider store={Store}>
          <NavigationProvider context={navigationContext}>
            <StackNavigation initialRoute={this.state.initialRoute} />
          </NavigationProvider>
        </Provider>
      );
    }
    return null;
  }
}

