import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Constants, SecureStore, WebBrowser } from 'expo';
import { Linking, View, Text } from 'react-native';
import { goToPetitionSummary } from '../application/redux/actions/navigation';
import Button from '../application/components/Button/Button';
import { addCredential } from '../application/redux/actions/attributes';
import { getPetition } from '../application/redux/actions/petition';


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

    WebBrowser.dismissBrowser();
    this.props.goToPetitionSummary(this.props.petitionLink);
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
      <View>
        <Text>{this.props.petition.title}</Text>
        <Button
          name="Verify with Barcelona Council"
          onPress={this.openWebBrowserAsync}
          style={{
            alignSelf: 'flex-end',
            width: 250,
          }}
        />
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
