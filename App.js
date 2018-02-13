import React from 'react';
import uuidv1 from 'uuid';
import { AsyncStorage } from 'react-native';
import { Font } from 'expo';
import {
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';
import Router from './Router';

const montserratMedium = require('./assets/fonts/Montserrat-Medium.ttf');
const latoBold = require('./assets/fonts/Lato-Bold.ttf');

async function initialiseWalletID() {
  let id = await AsyncStorage.getItem('@MyStore:id');

  if (!id) {
    id = await AsyncStorage.setItem('@MyStore:id', uuidv1());
  }

  return id;
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };

    this.initialiseWalletID = this.initialiseWalletID.bind(this);
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
        <NavigationProvider router={Router}>
          <StackNavigation initialRoute={Router.getRoute('home')} />
        </NavigationProvider>);
    }
    return null;
  }
}
