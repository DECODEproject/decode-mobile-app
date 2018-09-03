import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToPetitionSummary } from '../application/redux/actions/navigation';
import Button from '../application/components/Button/Button';
import styles from './styles';

class Authorisation extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      tintColor: 'rgb(0,163,158)',
      title: 'Authorise Connection',
    },
  };

  constructor(props) {
    super(props);
    this.goToPetitionSummary = this.goToPetitionSummary.bind(this);
  }

  goToPetitionSummary() {
    this.props.goToPetitionSummary(this.props.petitionLink);
  }

  render() {
    return (
      <View style={styles.authorisationContainer}>
        <View style={styles.authorisationBox}>
          <Text style={styles.authorisationBoxLogo}>SECURE PETITIONS</Text>
          <Text style={styles.authorisationBoxTextParagraph}>would like
            to connect with your DECODE wallet
          </Text>
          <Button name="AUTHORISE" onPress={this.goToPetitionSummary} />
        </View>
        <Text style={styles.authorisationBoxId}>Wallet ID: {this.props.walletId}</Text>
      </View>
    );
  }
}

Authorisation.propTypes = {
  goToPetitionSummary: PropTypes.func.isRequired,
  petitionLink: PropTypes.string,
  walletId: PropTypes.string,
};

Authorisation.defaultProps = {
  petitionLink: undefined,
  walletId: '',
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
  walletId: state.wallet.id,
});

const mapDispatchToProps = dispatch => ({
  goToPetitionSummary: () => { dispatch(goToPetitionSummary()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorisation);
