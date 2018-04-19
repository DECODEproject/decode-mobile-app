import React from 'react';
import { Font } from 'expo';
import { Provider } from 'react-redux';
import {
  NavigationProvider,
  StackNavigation,
  NavigationContext
} from '@expo/ex-navigation';
import Router from './Router';
import Store from './application/redux/store';
import { initialiseWalletID } from './LocalStorage';

const montserratMedium = require('./assets/fonts/Montserrat-Medium.ttf');
const latoBold = require('./assets/fonts/Lato-Bold.ttf');

const navigationContext = new NavigationContext({
  router: Router,
  store: Store
});

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Montserrat-Medium': montserratMedium,
      'Lato-Bold': latoBold,
    });

    await initialiseWalletID();

    this.setState({
      ready: true,
    });
  }

  render() {
    if (this.state.ready) {
      return (
        <Provider store={Store}>
          <NavigationProvider context={navigationContext}>
            <StackNavigation initialRoute={Router.getRoute('home')} />
          </NavigationProvider>
        </Provider>
      )
    }
    return null;
  }
}
