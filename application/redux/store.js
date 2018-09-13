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
}));

export default Store;
