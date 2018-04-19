import { Platform } from 'react-native';
import { createNavigationEnabledStore, NavigationReducer } from '@expo/ex-navigation';
import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import petitionLink from './reducers/petitionLink'
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';

const enhancer = compose(
  applyMiddleware(thunk),
  devTools({
    name: Platform.OS,
    hostname: 'localhost',
    port: 5678
  })
);
const createStoreWithMiddleware = enhancer(createStore);

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore: createStoreWithMiddleware,
  navigationStateKey: 'navigation',
});

const Store = createStoreWithNavigation(
  /* combineReducers and your normal create store things here! */
  combineReducers({
    navigation: NavigationReducer,
    petitionLink,
  })
);

export default Store;