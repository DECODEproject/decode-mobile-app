import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToSignConfirmation } from '../application/redux/actions/navigation';
import AttributeComponent from '../application/components/Attribute';

const config = require('../config.json');

const walletProxyLink = process.env.env ?
  config.development.walletProxy : config.production.walletProxy;

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

class PetitionSummarySign extends React.Component {
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
    };
    this.goToSignConfirmation = this.goToSignConfirmation.bind(this);
  }

  async goToSignConfirmation(petition, walletId) {
    this.setState({
      visible: true,
    });
    await fetch(`${walletProxyLink}/sign/petitions/${petition.id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signatory: walletId.substring(0, 5),
        isEthereum: petition.isEthereum,
      }),
    });
    this.props.goToSignConfirmation();
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
              Availability fairbnb cryptographic modelling data ontology pilot
            </Text>
            <Text style={styles.closingDate}>Closing: 28 October 2018</Text>
          </View>
          <Text style={styles.textTitle}>Your Information</Text>
          <AttributeComponent isVerified />
          <Text style={styles.requiredText}>*Required fields</Text>
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.signButton}
            onPress={() => { this.goToSignConfirmation(this.props.petition, this.props.walletId); }}
          >
            <Text style={styles.buttonText}>SIGN PETITION</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

PetitionSummarySign.propTypes = {
  petition: PropTypes.shape({
    id: PropTypes.string,
    isEthereum: PropTypes.string,
  }).isRequired,
  walletId: PropTypes.string.isRequired,
  goToSignConfirmation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  petition: state.petition.petition,
  walletId: state.wallet.id,
});

const mapDispatchToProps = dispatch => ({
  goToSignConfirmation: () => { dispatch(goToSignConfirmation()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PetitionSummarySign);
