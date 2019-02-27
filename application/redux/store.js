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

import { Platform } from 'react-native';
import { createNavigationEnabledStore, NavigationReducer } from '@expo/ex-navigation';
import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import decidimInfo from './reducers/decidimInfo';
import petition from './reducers/petition';
import wallet from './reducers/wallet';
import attributes from './reducers/attributes';
import authorization from './reducers/authorization';
import pinSetup from './reducers/pinSetup';
import featureToggles from './reducers/featureToggles';
import login from './reducers/login';
import verification from './reducers/verification';

const enhancer = compose(
  applyMiddleware(thunk),
  devTools({
    name: Platform.OS,
    hostname: 'localhost',
    port: 5678,
  }),
);
const createStoreWithMiddleware = enhancer(createStore);

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore: createStoreWithMiddleware,
  navigationStateKey: 'navigation',
});

const Store = createStoreWithNavigation(combineReducers({
  navigation: NavigationReducer,
  decidimInfo,
  petition,
  wallet,
  attributes,
  authorization,
  pinSetup,
  featureToggles,
  login,
  verification,
}));

export default Store;
