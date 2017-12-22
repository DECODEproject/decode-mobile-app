import React from 'react';
import { StyleSheet, Image, Text, View, Button, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Router from '../Router';

const decodeLogo = require('../assets/images/wallet_logo.png');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  logo: {
    height: 60,
    marginBottom: 30,
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
  PetitionSummary: {
    backgroundColor: '#EEE',
    width: 300,
  },
  textSubHeading: {
    fontSize: 16,
  },
});

export default class PetitionSummarySign extends React.Component {
  constructor(props) {
    super(props);
    this.goToSignConfirmation = this.goToSignConfirmation.bind(this);
  }

  goToSignConfirmation() {
    this.props.navigator.push(Router.getRoute('signConfirmation'));
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={decodeLogo}
        />

        <Text style={styles.textHeading}>Attribute Added</Text>
        <Text style={styles.textHeading}>Sign Petition</Text>
        <View style={styles.PetitionSummary}>
          <Text style={styles.textSubHeading}>Petition Summary</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textParagraph}>To sign this petition you must be a resident
            of Atlantis. To demonstrate that you are a resident of Atlantis,
            you are required to share the
            following attribute with Secure Petitions when you sign the petition.</Text>
          <FlatList
            style={styles.flatList}
            data={[{ key: 'Atlantis Residency - Issued by Atlantis Council' }]}
            renderItem={({ item }) => <Text>{item.key}</Text>}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.goToSignConfirmation}
            title="Sign Petition"
            color="rgb(0,163,158)"
          />
        </View>
      </View>
    );
  }
}

PetitionSummarySign.propTypes = {
  navigator: PropTypes.shape({ push: PropTypes.func.isRequired }),
};

PetitionSummarySign.defaultProps = {
  navigator: '',
};

