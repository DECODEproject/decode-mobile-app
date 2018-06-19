import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Constants, SecureStore, WebBrowser } from 'expo';
import { Linking, View, Text, Image } from 'react-native';
import { goToPetitionSummary } from '../application/redux/actions/navigation';
import Button from '../application/components/Button/Button';
import { addCredential } from '../application/redux/actions/attributes';
import { getPetition } from '../application/redux/actions/petition';
import styles from './styles';

const decodeUser = require('../assets/images/decode-user.png');

class AttributesSummary extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      fontSize: 20,
      fontWeight: '500',
      tintColor: 'rgb(0,163,158)',
      title: 'Verify Your Information',
    },
  };

  componentDidMount() {
    this.props.getPetition(this.props.petitionLink);
  }

  handleRedirect = (event) => {
    const { url } = event;
    const { petition, walletId } = this.props;

    this.props.addCredential(petition.attributes[0], walletId, url);

    this.props.goToPetitionSummary(this.props.petitionLink);
    WebBrowser.dismissBrowser();
  };

  openPetitionInBrowser = () => {
    const petitionUrl = `http://secure-petitions.s3-website-eu-west-1.amazonaws.com/#/${this.props.petition.id}`;
    Linking.openURL(petitionUrl);
  };

  openWebBrowserAsync = async () => {
    const queryParam = encodeURIComponent(Constants.linkingUri);
    const url = `http://atlantis-decode.s3-website-eu-west-1.amazonaws.com/#/?linkingUri=${queryParam}`;

    Linking.addEventListener('url', this.handleRedirect);
    await WebBrowser.openBrowserAsync(url);
    Linking.removeEventListener('url', this.handleRedirect);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#13A398', flex: 1.2 }}>
          <Image
            style={{
              height: 100,
              alignSelf: 'center',
              resizeMode: 'contain',
              marginVertical: 20,
            }}
            source={decodeUser}
          />
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 16,
              fontWeight: '700',
              color: 'white',
            }}
          >
            Isabella Dominguez
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{
            color: '#13A398',
            margin: 16,
            marginTop: 30,
            fontSize: 20,
          }}
          >
            {this.props.petition.title}
          </Text>
          <Text style={{
            color: '#3E393C',
            fontWeight: '900',
            fontSize: 13,
            marginLeft: 16,
          }}
          >
            DECIDIM needs to verify your Barcelona residency.
          </Text>
          <Text style={{
            color: '#3E393C',
            fontWeight: '100',
            fontSize: 13,
            marginLeft: 16,
            marginTop: 8,
          }}
          >
            You can do this with the Barcelona City Council
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Button
            name="Verify with Barcelona Council"
            onPress={this.openWebBrowserAsync}
            style={{
              marginTop: 40,
              alignSelf: 'center',
              width: 250,
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={styles.cancelSigningPetition}
            onPress={this.openPetitionInBrowser}
          >Or, cancel signing this petition
          </Text>
        </View>
      </View>
    );
  }
}

AttributesSummary.propTypes = {
  getPetition: PropTypes.func.isRequired,
  petitionLink: PropTypes.string.isRequired,
  petition: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    closingDate: PropTypes.string,
  }),
  goToPetitionSummary: PropTypes.func.isRequired,
  addCredential: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
};

AttributesSummary.defaultProps = {
  petition: undefined,
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
  petition: state.petition.petition,
  walletId: state.wallet.id,
  attributes: state.attributes,
});

const mapDispatchToProps = dispatch => ({
  getPetition: petitionLink => dispatch(getPetition(petitionLink)),
  goToPetitionSummary: (petitionLink) => { dispatch(goToPetitionSummary(petitionLink)); },
  addCredential: (attribute, walletId, url) => {
    dispatch(addCredential(attribute, walletId, url, SecureStore.setItemAsync));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AttributesSummary);
