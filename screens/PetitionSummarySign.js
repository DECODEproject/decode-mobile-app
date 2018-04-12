import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';
import Router from '../Router';
import { getWalletID } from '../LocalStorage';

const config = require('../config.json');

const walletProxyLink = process.env.env ?
  config.development.walletProxy : config.production.walletProxy;

const tick = require('../assets/images/tick_small.jpg');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(246, 246, 246)',
    flex: 1,
  },
  petitionSummaryBox: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    padding: 10,
    margin: 16,
  },
  petitionTitle: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
  },
  petitionDescription: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  closingDate: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 12,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: 16,
  },
  attributeContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 1,
    padding: 16,
  },
  attributeName: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    fontWeight: '500',
  },
  tick: {
    height: 20,
    marginTop: 3,
    width: 20,
  },
  attribute: {
    marginLeft: 15,
  },
  attributeDetails: {
    color: 'rgba(0, 0, 0, 0.54)',
    marginVertical: 4,
  },
  attributeStatus: {
    fontWeight: '500',
  },
  requiredText: {
    fontSize: 12,
    marginLeft: 16,
    marginTop: 10,
  },
  footerContainer: {
    backgroundColor: '#FFF',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderWidth: 1,
    height: 64,
  },
  signButton: {
    alignSelf: 'stretch',
    backgroundColor: 'rgb(0,163,158)',
    borderRadius: 2,
    elevation: 2,
    height: 36,
    marginBottom: 18,
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: 'rgba(0, 0, 0, 0.54)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export default class PetitionSummaryGet extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      fontSize: 20,
      fontWeight: '500',
      tintColor: 'rgb(0,163,158)',
      title: 'Sign Petition',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      petition: {},
      loading: true,
      serverError: false,
      id: null,
    };
    this.goToSignConfirmation = this.goToSignConfirmation.bind(this);
  }

  async componentWillMount() {
    const id = await getWalletID();
    this.setState({ id });
  }

  componentDidMount() {
    return fetch(this.props.route.params.petitionLink)
      .then(handleErrors)
      .then(response => response.json())
      .then(petition => this.setState({ loading: false, petition }))
      .catch(() => this.setState({ loading: false, serverError: true }));
  }

  async goToSignConfirmation() {
    this.setState({
      visible: true,
    });
    await fetch(`${walletProxyLink}/sign/petitions/${this.state.petition.id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signatory: this.state.id.substring(0, 5),
        isEthereum: this.state.petition.isEthereum,
      }),
    });
    this.props.navigator.push(Router.getRoute('signConfirmation'));
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.visible} textStyle={{ color: '#FFF' }} />
          </View>
          <View style={styles.petitionSummaryBox}>
            <Text style={styles.petitionTitle}>Universal basic income</Text>
            <Text style={styles.petitionDescription}>
              White paper blockchain technology node research and develop.
              Cryptographic modelling.
              Availability fairbnb cryptographic modelling data ontology pilot</Text>
            <Text style={styles.closingDate}>Closing: 28 October 2018</Text>
          </View>
          <Text style={styles.textTitle}>Your Information</Text>
          <View style={styles.attributeContainer}>
            <Image
              style={styles.tick}
              source={tick}
            />
            <View style={styles.attribute}>
              <Text style={styles.attributeName}>Verified Atlantis Resident*</Text>
              <Text style={styles.attributeDetails}>Atlantis Resident Status:
                <Text style={styles.attributeStatus}> Confirmed</Text></Text>
            </View>
          </View>
          <Text style={styles.requiredText}>*Required fields</Text>
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.signButton}
            onPress={this.goToSignConfirmation}
          >
            <Text style={styles.buttonText}>SIGN PETITION</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

PetitionSummaryGet.propTypes = {
  navigator: PropTypes.shape({ push: PropTypes.func.isRequired }),
  route: PropTypes.shape({ params: PropTypes.object }),
};

PetitionSummaryGet.defaultProps = {
  navigator: {
    push: () => {
    },
  },
  route: {
    params: {},
  },
};
