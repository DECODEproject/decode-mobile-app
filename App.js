import React from 'react';
import { Font, ScreenOrientation, SecureStore } from 'expo';
import { Provider } from 'react-redux';
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
      initialRoute: Router.getRoute('walkthrough'),
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Montserrat-Medium': montserratMedium,
      'Lato-Bold': latoBold,
    });

    await initialiseWalletID();
    await this.goToInitialScreen(SecureStore.getItemAsync);

    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);

    this.setState({
      ready: true,
    });
  }


  async goToInitialScreen(getFromStoreFn) { // eslint-disable-line
    try {
      return retrievePin(getFromStoreFn).then((pin) => {
        if (pin !== undefined) {
          this.setState({
            initialRoute: Router.getRoute('home'),
          });
        }
      });
    } catch (e) {
      console.error(e);
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

