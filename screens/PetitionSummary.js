import React from 'react';
import { Constants } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { getPetition, signPetition, toggleEnableAttribute } from '../application/redux/actions/petition';
import { setSignOutcome } from '../application/redux/actions/signOutcome';
import Button from '../application/components/Button/Button';
import { goToSignOutcome } from '../application/redux/actions/navigation';
import AttributeComponent from '../application/components/Attribute/Attribute';
import getWalletProxyUrl from '../config';
import openPetitionInBrowser from '../application/utils';
import styles from './styles';
import i18n from '../i18n';


const walletProxyLink = getWalletProxyUrl(Constants.manifest.releaseChannel);

const isOptionalAttribute = attr => !attr.provenance;
const isMandatoryAttribute = attr => !isOptionalAttribute(attr);

class PetitionSummary extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      fontSize: 20,
      fontWeight: '500',
      tintColor: 'rgb(0,163,158)',
      title: 'Sign Petition',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.props.getPetition(this.props.petitionLink);
  }

  async sign(petition, walletId, vote) {
    this.setState({
      loading: true,
    });

    /* const age = (this.props.attributes.optionalAttributesToggleStatus.age) ? '20-29' : 'any';
    const gender = (this.props.attributes.optionalAttributesToggleStatus.gender) ? 'female' : 'any';
*/
    const age = '20-29';
    const gender = 'female';

    let signSuccess;
    try {
      const signAction = await this.props.signPetition(petition, walletId, vote, age, gender);
      signSuccess = (signAction.error === undefined);
    } catch (e) {
      signSuccess = false;
    }
    this.props.setSignOutcome(signSuccess);
    this.props.goToSignOutcome();
    this.setState({
      loading: false,
    });
  }

  renderAttribute = attr => (<AttributeComponent
    key={attr.predicate}
    isMandatory={isMandatoryAttribute(attr)}
    toggleCallback={() => this.props.toggleEnableAttribute(attr.predicate)}
    isEnabled
    name={this.props.t(attr.predicate)}
  />);

  render() {
    const petitionAttributes = (
      <View style={styles.petitionSummaryBox}>
        <Text style={styles.petitionSummaryPetitionTitle}>{this.props.petition.title}</Text>
        <Text style={styles.petitionDescription}>
          {this.props.t('title')}
        </Text>
        <Text>
          {this.props.t('description')}
        </Text>
        { this.props.petitionAttributes.filter(isMandatoryAttribute).map(this.renderAttribute) }
        <Text>
          {this.props.t('optional')}
        </Text>
        { this.props.petitionAttributes.filter(isOptionalAttribute).map(this.renderAttribute) }
      </View>
    );
    const petitionError = (
      <View style={styles.petitionSummaryErrorBox}>
        <Text style={styles.petitionErrorTitle}>Error</Text>
        <Text style={styles.petitionErrorDescription}>{this.props.petitionError}</Text>
      </View>
    );
    return (
      <View style={styles.petitionSummaryContainer}>
        <ScrollView>
          { this.props.petitionError && petitionError }
          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.loading} textStyle={{ color: '#FFF' }} />
          </View>
          { this.props.petition && petitionAttributes }
        </ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <Button
            enabled={this.props.attributes.isRequiredAttributeEnabled}
            onPress={() => { this.sign(this.props.petition, this.props.walletId, 'Yes'); }}
            name={this.props.t('yes')}
            style={{
              flex: 1,
            }}
          />
          <Button
            enabled={this.props.attributes.isRequiredAttributeEnabled}
            onPress={() => { this.sign(this.props.petition, this.props.walletId, 'No'); }}
            name={this.props.t('no')}
            style={{
              flex: 1,
            }}
          />
        </View>
        <Text
          style={styles.cancelSigningPetition}
          onPress={() => openPetitionInBrowser(this.props.petition.id)}
        >{this.props.t('cancel')}
        </Text>
      </View>);
  }
}

PetitionSummary.propTypes = {
  goToSignOutcome: PropTypes.func.isRequired,
  setSignOutcome: PropTypes.func.isRequired,
  petitionLink: PropTypes.string.isRequired,
  petition: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    closingDate: PropTypes.string,
  }),
  // enabledAttributes: PropTypes.arrayOf(PropTypes.string).isRequired,
  petitionError: PropTypes.string,
  getPetition: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
  attributes: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    isRequiredAttributeEnabled: PropTypes.bool,
  }).isRequired,
  signPetition: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  toggleEnableAttribute: PropTypes.func.isRequired,
  petitionAttributes: PropTypes.arrayOf(PropTypes.shape({
    predicate: PropTypes.string.isRequired,
  })),
};

PetitionSummary.defaultProps = {
  petition: undefined,
  petitionError: undefined,
  petitionAttributes: [],
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
  petition: state.petition.petition,
  petitionError: state.petition.error,
  petitionAttributes: state.petition.petitionAttributes,
  // enabledAttributes: state.petition.enabledAttributes,
  walletId: state.wallet.id,
  attributes: state.attributes,
  signSuccess: state.signSuccess,
});

const mapDispatchToProps = dispatch => ({
  getPetition: (petitionLink) => { dispatch(getPetition(petitionLink)); },
  setSignOutcome: (signSuccess) => { dispatch(setSignOutcome(signSuccess)); },
  goToSignOutcome: () => { dispatch(goToSignOutcome()); },
  signPetition: (petition, walletId, vote, age, gender) =>
    dispatch(signPetition(petition, walletId, walletProxyLink, vote, age, gender)),
  toggleEnableAttribute: (attrPredicate) => { dispatch(toggleEnableAttribute(attrPredicate)); },
});

export default translate('petitionSummary', { i18n })(connect(mapStateToProps, mapDispatchToProps)(PetitionSummary));
