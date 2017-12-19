import React from 'react';
import { Font } from 'expo';
import Home from './screens/Home';

const montserratMedium = require('./assets/fonts/Montserrat-Medium.ttf');

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
    });

    this.setState({
      ready: true,
    });
  }

  render() {
    if (this.state.ready) {
      return <Home />;
    }
    return null;
  }
}
