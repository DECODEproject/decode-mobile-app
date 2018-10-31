import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Constants, SecureStore, WebBrowser } from 'expo';
import { Linking, View, Text, Image, TouchableOpacity } from 'react-native';
import { translate } from 'react-i18next';
import { goToPetitionSummary } from '../application/redux/actions/navigation';
import LinkButton from '../application/components/LinkButton/LinkButton';
import RequesterInfo from '../application/components/RequesterInfo/RequesterInfo';
import PetitionDescription from '../application/components/PetitionDescription/PetitionDescription';
import { addCredential } from '../application/redux/actions/attributes';
import openPetitionInBrowser from '../application/utils';
import styles from './styles';
import i18n from '../i18n';

const backArrowIcon = require('../assets/images/ico-back-button.png');

class AttributesSummary extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      fontSize: 20,
      fontWeight: '500',
      tintColor: 'rgb(0,163,158)',
      renderLeft: router => (
        <TouchableOpacity
          onPress={() => openPetitionInBrowser(router.params.petitionId)}
          style={{ paddingTop: 10, paddingLeft: 10 }}
        >
          <Image source={backArrowIcon} />
        </TouchableOpacity>
      ),
    },
  };

  handleRedirect = async (event) => {
    const { url } = event;
    const { petition, walletId } = this.props;
    await this.props.addCredential(petition.attributes.mandatory[0], walletId, url);
    await this.props.goToPetitionSummary();
    WebBrowser.dismissBrowser();
  };

  openWebBrowserAsync = async () => {
    const credentialIssuerUrl = this.props.petition.attributes.mandatory[0].provenance.url;
    // const credentialIssuerUrl = `http://atlantis-decode.s3-website-eu-west-1.amazonaws.com/#/?linkingUri=${queryParam}`;
    const queryParam = encodeURIComponent(Constants.linkingUri);
    const url = `${credentialIssuerUrl}?linkingUri=${queryParam}`;
    console.log(url);
    Linking.addEventListener('url', this.handleRedirect);
    await WebBrowser.openBrowserAsync(url);
    Linking.removeEventListener('url', this.handleRedirect);
  };

  render() {
    const { petition, t } = this.props;
    return (
      <View style={{ flex: 1, padding: 26 }}>
        <PetitionDescription
          title={petition.title}
          description={petition.description}
        />

        <View
          style={{
            marginTop: 10,
            borderBottomColor: '#80979797',
            borderBottomWidth: 1,
          }}
        />

        <RequesterInfo name="Decidim Barcelona" />

        <View style={{ paddingBottom: 20 }}>
          <Text style={{ color: '#9B9B9B', fontSize: 14 }}>
            <Text style={{ color: '#D0021B' }}>*</Text> {t('requiredAttributes')}
          </Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>
            {t(petition.attributes.mandatory[0].predicate)} <Text style={{ color: '#D0021B' }}>*</Text>
          </Text>
          <LinkButton
            name={t('button')}
            onPress={this.openWebBrowserAsync}
            style={{
              marginTop: 40,
              alignSelf: 'center',
            }}
          />
        </View>

        <View style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 20,
          }}
        >
          <Text
            style={styles.cancelSigningPetition}
            onPress={() => openPetitionInBrowser(petition.id)}
          >{t('cancel')}
          </Text>
        </View>
      </View>
    );
  }
}

AttributesSummary.propTypes = {
  petition: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    closingDate: PropTypes.string,
    attributes: PropTypes.shape({
      mandatory: PropTypes.arrayOf(PropTypes.shape({
        provenance: PropTypes.shape({
          url: PropTypes.string,
        }),
      })),
    }),
  }),
  goToPetitionSummary: PropTypes.func.isRequired,
  addCredential: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

AttributesSummary.defaultProps = {
  petition: undefined,
};

const mapStateToProps = state => ({
  petition: state.petition.petition,
  walletId: state.wallet.id,
});

const mapDispatchToProps = dispatch => ({
  goToPetitionSummary: () => { dispatch(goToPetitionSummary()); },
  addCredential: (attribute, walletId, url) => {
    dispatch(addCredential(attribute, walletId, url, SecureStore.setItemAsync));
  },
});

export default translate('attributesSummary', { i18n })(connect(mapStateToProps, mapDispatchToProps)(AttributesSummary));
