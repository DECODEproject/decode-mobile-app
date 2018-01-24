import React from 'react';
import { Font } from 'expo';
import {
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';
import Router from './Router';

const montserratMedium = require('./assets/fonts/Montserrat-Medium.ttf');
const latoBold = require('./assets/fonts/Lato-Bold.ttf');

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
