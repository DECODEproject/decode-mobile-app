import React from 'react';
import { Constants } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { getPetition, signPetition } from '../application/redux/actions/petition';
import { setSignOutcome } from '../application/redux/actions/signOutcome';
import Button from '../application/components/Button/Button';
import { goToSignOutcome } from '../application/redux/actions/navigation';
import AttributeComponent from '../application/components/Attribute/Attribute';
import getWalletProxyUrl from '../config';
import openPetitionInBrowser from '../application/utils';
import styles from './styles';
import i18n from '../i18n';
import {
  isAttributeEnabled, areAllMandatoryAttrsEnabled, formAge,
  formAgeRange, getEnabledAttributeValue, findAttribute,
  buildAttributes, toggleElementsInList,
} from '../application/utils/attributeManagement';


const walletProxyLink = getWalletProxyUrl(Constants.manifest.releaseChannel);

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
      matchedAttributes: buildAttributes(props.walletAttributes, props.attributes),
      enabledAttributes: [{ predicate: 'schema:addressLocality' }],
    };
  }

  componentDidMount() {
    this.props.getPetition(this.props.petitionLink)
      .then(() => {
        const matched = buildAttributes(this.props.walletAttributes, this.props.attributes);
        this.setState({ matchedAttributes: matched });
      });
  }

  toggleEnabledAttribute(attr) {
    this.setState({ enabledAttributes: toggleElementsInList(attr, this.state.enabledAttributes) });
  }

  async sign(petition, walletId, vote) {
    this.setState({
      loading: true,
    });

    const attributes = [...this.state.matchedAttributes.optional,
      ...this.state.matchedAttributes.missing,
      ...this.state.matchedAttributes.mandatory];

    const ageAttribute = findAttribute('schema:dateOfBirth', attributes);
    const genderAttribute = findAttribute('schema:gender', attributes);

    const age = formAge(ageAttribute, this.state.enabledAttributes);
    const gender = getEnabledAttributeValue(genderAttribute, this.state.enabledAttributes);

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

  renderAttribute = (attr, isMandatory) => {
    let valueToShow = this.props.t(attr.object);

    if (attr.predicate === 'schema:dateOfBirth') {
      valueToShow = formAgeRange(attr);
    }

    return (<AttributeComponent
      key={attr.predicate}
      isMandatory={isMandatory}
      toggleCallback={() => this.toggleEnabledAttribute(attr)}
      isEnabled={isAttributeEnabled(attr, this.state.enabledAttributes)}
      name={`${this.props.t(attr.predicate)} - ${valueToShow}`}
    />
    );
  };

  renderMissingAttribute = attr => (
    <Text style={styles.missingAttribute} key={attr.predicate}> {`${this.props.t(attr.predicate)}`} </Text>
  );

  render() {
    const {
      petition,
      petitionError,
      t,
      walletId,
      attributes,
    } = this.props;

    const allMandatoryEnabled = areAllMandatoryAttrsEnabled(
      this.state.enabledAttributes,
      attributes.mandatory,
    );

    const { matchedAttributes } = this.state;
    const petitionAttributesTemplate = (
      <View style={styles.petitionSummaryBox}>
        <Text style={styles.petitionSummaryPetitionTitle}>{petition.title}</Text>
        <Text style={styles.petitionDescription}>
          {t('title')}
        </Text>
        <Text>
          {t('description')}
        </Text>
        { matchedAttributes.mandatory.map(attr => this.renderAttribute(attr, true)) }
        <Text>
          {t('optional')}
        </Text>
        { matchedAttributes.optional.map(attr => this.renderAttribute(attr)) }
        { matchedAttributes.missing.map(attr => this.renderMissingAttribute(attr)) }
      </View>
    );
    const petitionErrorTemplate = (
      <View style={styles.petitionSummaryErrorBox}>
        <Text style={styles.petitionErrorTitle}>Error</Text>
        <Text style={styles.petitionErrorDescription}>{petitionError}</Text>
      </View>
    );
    return (
      <View style={styles.petitionSummaryContainer}>
        <ScrollView>
          { petitionError && petitionErrorTemplate }
          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.loading} textStyle={{ color: '#FFF' }} />
          </View>
          { petition && petitionAttributesTemplate }
        </ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <Button
            enabled={allMandatoryEnabled}
            onPress={() => { this.sign(petition, walletId, 'Yes'); }}
            name={t('yes')}
            style={{
              flex: 1,
            }}
          />
          <Button
            enabled={allMandatoryEnabled}
            onPress={() => { this.sign(petition, walletId, 'No'); }}
            name={t('no')}
            style={{
              flex: 1,
            }}
          />
        </View>
        <Text
          style={styles.cancelSigningPetition}
          onPress={() => openPetitionInBrowser(petition.id)}
        >{t('cancel')}
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
  attributes: PropTypes.shape({
    mandatory: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    optional: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }),
  petitionError: PropTypes.string,
  getPetition: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
  signPetition: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  walletAttributes: PropTypes.shape({
    list: PropTypes.instanceOf(Map),
  }).isRequired,
};

PetitionSummary.defaultProps = {
  petition: undefined,
  petitionError: undefined,
  attributes: {
    mandatory: [],
    optional: [],
  },
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
  petition: state.petition.petition,
  petitionError: state.petition.error,
  attributes: state.petition.petition.attributes,
  walletId: state.wallet.id,
  signSuccess: state.signSuccess,
  walletAttributes: state.attributes.list,
});

const mapDispatchToProps = dispatch => ({
  // TODO: Inject DecidimClient
  getPetition: petitionLink => dispatch(getPetition(null, petitionLink, null)),
  setSignOutcome: (signSuccess) => { dispatch(setSignOutcome(signSuccess)); },
  goToSignOutcome: () => { dispatch(goToSignOutcome()); },
  signPetition: (petition, walletId, vote, age, gender) =>
    dispatch(signPetition(petition, walletId, walletProxyLink, vote, age, gender)),
});

export default translate('petitionSummary', { i18n })(connect(mapStateToProps, mapDispatchToProps)(PetitionSummary));

