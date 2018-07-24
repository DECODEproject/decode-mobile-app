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

    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);

    this.setState({
      ready: true,
    });
  }


  async goToInitialScreen(retrievePinFunc, routerFunc) { // eslint-disable-line

    try {
      return retrievePinFunc().then((pin) => {
        if (pin !== undefined) {
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

