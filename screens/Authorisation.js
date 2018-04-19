import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Router from '../Router';
import { getWalletID } from '../LocalStorage';

const styles = StyleSheet.create({
  authorisationBox: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    margin: 16,
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'rgb(0,163,158)',
    borderRadius: 2,
    elevation: 2,
    height: 36,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: 'rgba(0, 0, 0, 0.54)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 250,
  },
  buttonText: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  container: {
    backgroundColor: 'rgb(246, 246, 246)',
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    alignSelf: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: 25,
    color: 'rgb(203,73,45)',
    marginBottom: 40,
  },
  id: {
    alignSelf: 'center',
    marginBottom: 16,
    color: 'grey',
    fontSize: 10,
  },
  textParagraph: {
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
});

export default class Authorisation extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      tintColor: 'rgb(0,163,158)',
      title: 'Authorise Connection',
    },
  }

  constructor(props) {
    super(props);
    this.goToPetitionSummaryGet = this.goToPetitionSummaryGet.bind(this);
    this.state = {
      id: 'default id',
    };
  }

  async componentWillMount() {
    const id = await getWalletID();
    this.setState({ id });
  }

  goToPetitionSummaryGet() {
    this.props.navigator.push(Router.getRoute('petitionSummaryGet', { petitionLink: this.props.route.params.petitionLink }));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.authorisationBox}>
          <Text style={styles.logo}>SECURE PETITIONS</Text>
          <Text style={styles.textParagraph}>would like
            to connect with your DECODE wallet
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.goToPetitionSummaryGet}
          >
            <Text style={styles.buttonText}>AUTHORISE</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.id}>Wallet ID: {this.state.id}</Text>
      </View>
    );
  }
}

Authorisation.propTypes = {
  navigator: PropTypes.shape({ push: PropTypes.func.isRequired }),
  route: PropTypes.shape({ params: PropTypes.object }),
};

Authorisation.defaultProps = {
  navigator: {
    push: () => {
    },
  },
  route: {
    params: {},
  },
};
