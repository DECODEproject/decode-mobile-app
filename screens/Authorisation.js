import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Router from '../Router';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 30,
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
    this.goToPetitionSummaryGet = this.goToPetitionSummaryGet.bind(this);
  }

  goToPetitionSummaryGet() {
    this.props.navigator.push(Router.getRoute('petitionSummaryGet'));
  }
  
  static route = {
    navigationBar: {
      tintColor: 'rgb(0,163,158)',
      title: 'Authorise Connection',
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
            onPress={this.goToPetitionSummaryGet}
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
