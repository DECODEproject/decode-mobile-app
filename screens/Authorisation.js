import React from 'react';
import { StyleSheet, Image, Text, View, Button, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Router from '../Router';

const decodeLogo = require('../assets/images/wallet_logo.png');


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 30,
  },
  logo: {
    height: 60,
    marginBottom: 20,
    width: 80,
  },
  textHeading: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  textContainer: {
    marginBottom: 30,
    width: 300,
  },
  flatList: {
    marginTop: 15,
    marginBottom: 30,
  },
  buttonContainer: {
    width: 300,
  },
  textParagraph: {
    marginBottom: 15,
  },
});

export default class Authorisation extends React.Component {
  constructor(props) {
    super(props);
    this.goToPetitionSummary = this.goToPetitionSummary.bind(this);
  }

  goToPetitionSummary() {
    this.props.navigator.push(Router.getRoute('petitionSummary'));
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={decodeLogo}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textHeading}>Secure Petitions is requesting
            to connect with your DECODE wallet</Text>
          <Text style={styles.textParagraph}>Secure Petitions may request access to
            the following information stored in your wallet.</Text>
          <FlatList
            style={styles.flatList}
            data={[{ key: '- Atlantis Residency' }]}
            renderItem={({ item }) => <Text>{item.key}</Text>}
          />
          <Text>Accepting this connection will not automatically share
            this information with Secure Petitions.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.goToPetitionSummary}
            title="Authorise Connection"
            color="rgb(0,163,158)"
          />
        </View>
      </View>
    );
  }
}

Authorisation.propTypes = {
  navigator: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
