import React from 'react';
import { Constants } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, View, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { signPetition } from '../application/redux/actions/petition';
import Button from '../application/components/Button/Button';
import { goToSignOutcome } from '../application/redux/actions/navigation';
import AttributeComponent from '../application/components/Attribute/Attribute';
import PetitionDescription from '../application/components/PetitionDescription/PetitionDescription';
import getChainspaceUrl from '../config';
import { districtNameFromId } from '../lib/districts';
import openPetitionInBrowser from '../application/utils';
import styles from './styles';
import i18n from '../i18n';
import {
  isAttributeEnabled, areAllMandatoryAttrsEnabled, formAge,
  formAgeRange, getEnabledAttributeValue, findAttribute,
  buildAttributes, toggleElementsInList,
} from '../application/utils/attributeManagement';
import ChainspaceClient from '../lib/ChainspaceClient';
import ZenroomContract from '../lib/ZenroomContract';
import ZenroomExecutor from '../lib/ZenroomExecutor';


const backArrowIcon = require('../assets/images/ico-back-button.png');

const backToPetitionInBrowser = (petitionId) => {
  const petitionUrl = `http://secure-petitions.s3-website-eu-west-1.amazonaws.com/#/${petitionId}`;
  Linking.openURL(petitionUrl);
};

const chainspaceUrl = getChainspaceUrl(Constants.manifest.releaseChannel);

class PetitionSummary extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      fontSize: 20,
      fontWeight: '500',
      tintColor: 'rgb(0,163,158)',
      renderLeft: router => (
        <TouchableOpacity
          onPress={() => backToPetitionInBrowser(router.params.petitionId)}
          style={{ paddingTop: 10, paddingLeft: 10 }}
        >
          <Image source={backArrowIcon} />
        </TouchableOpacity>
      ),
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
    const matched = buildAttributes(this.props.walletAttributes, this.props.attributes);
    this.state = {
      ...this.state,
      matchedAttributes: matched,
    };
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
    const districtAttribute = findAttribute('schema:district', attributes);

    const age = formAge(ageAttribute, this.state.enabledAttributes);
    const gender = getEnabledAttributeValue(genderAttribute, this.state.enabledAttributes);
    const district = getEnabledAttributeValue(districtAttribute, this.state.enabledAttributes);

    await this.props.signPetition(
      vote,
      age,
      gender,
      district,
      this.props.chainspaceClient,
      this.props.zenroomContract,
    );
    this.props.goToSignOutcome();
    this.setState({
      loading: false,
    });
  }

  renderAttribute = (attr, isMandatory) => {
    let displayValue = this.props.t(attr.object);

    if (attr.predicate === 'schema:dateOfBirth') {
      displayValue = `${this.props.t('age')}: ${formAgeRange(attr)}`;
    }

    if (attr.predicate === 'schema:district') {
      displayValue = districtNameFromId(attr.object);
    }

    return (<AttributeComponent
      key={attr.predicate}
      value={displayValue}
      isMandatory={isMandatory}
      toggleCallback={() => this.toggleEnabledAttribute(attr)}
      isEnabled={isAttributeEnabled(attr, this.state.enabledAttributes)}
      name={this.props.t(attr.predicate)}
      requiredError={this.props.t('requiredAttributeError')}
    />
    );
  };

  renderMissingAttribute = attr => (
    <Text style={styles.missingAttribute} key={attr.predicate}> {`${this.props.t(attr.predicate)}`} </Text>
  );

  render() {
    const {
      petition,
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
        { matchedAttributes.mandatory.map(attr => this.renderAttribute(attr, true)) }
        { matchedAttributes.optional.map(attr => this.renderAttribute(attr)) }
        <Text style={{ marginTop: 20 }}>
          {t('optional')}
        </Text>
        { matchedAttributes.missing.map(attr => this.renderMissingAttribute(attr)) }
      </View>
    );
    return (
      <View style={styles.petitionSummaryContainer}>
        <PetitionDescription
          title={petition.title}
          description={petition.description}
        />

        <View
          style={{
            marginTop: 10,
            borderBottomColor: '#809B9B9B',
            borderBottomWidth: 1,
          }}
        />

        <View style={{ paddingVertical: 20 }}>
          <Text style={{ fontSize: 14, lineHeight: 20 }}>{t('sharing')}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 14, lineHeight: 20 }}>Decidim Barcelona.</Text>
        </View>

        <View style={{ paddingBottom: 20 }}>
          <Text style={{ color: '#9B9B9B', fontSize: 14 }}>
            <Text style={{ color: '#D0021B' }}>*</Text> {t('requiredAttributes')}
          </Text>
        </View>

        <ScrollView>
          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.loading} textStyle={{ color: '#FFF' }} textContent={t('loading')} />
          </View>
          { petition && petitionAttributesTemplate }
        </ScrollView>

        <View
          style={{
            marginTop: 10,
            borderBottomColor: '#809B9B9B',
            borderBottomWidth: 2,
          }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            enabled={allMandatoryEnabled}
            onPress={() => { this.sign(petition, walletId, 'No'); }}
            name={t('no')}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 20,
              height: 'auto',
            }}
          />
          <Button
            enabled={allMandatoryEnabled}
            onPress={() => { this.sign(petition, walletId, 'Yes'); }}
            name={t('yes')}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 20,
              height: 'auto',
            }}
          />
        </View>
        <Text
          style={styles.cancelSigningPetition}
          onPress={() => openPetitionInBrowser(petition.id)}
        >{t('cancel')}
        </Text>
      </View>
    );
  }
}

PetitionSummary.propTypes = {
  goToSignOutcome: PropTypes.func.isRequired,
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
  walletId: PropTypes.string.isRequired,
  signPetition: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  walletAttributes: PropTypes.shape({
    list: PropTypes.instanceOf(Map),
  }).isRequired,
  chainspaceClient: PropTypes.instanceOf(ChainspaceClient).isRequired,
  zenroomContract: PropTypes.instanceOf(ZenroomContract).isRequired,
};

PetitionSummary.defaultProps = {
  petition: undefined,
  attributes: {
    mandatory: [],
    optional: [],
  },
};

const mapStateToProps = state => ({
  petition: state.petition.petition,
  attributes: state.petition.petition.attributes,
  walletId: state.wallet.id,
  signSuccess: state.signSuccess,
  walletAttributes: state.attributes.list,
  chainspaceClient: new ChainspaceClient(chainspaceUrl),
  zenroomContract: new ZenroomContract(new ZenroomExecutor()),
});

const mapDispatchToProps = dispatch => ({
  goToSignOutcome: () => { dispatch(goToSignOutcome()); },
  signPetition: (vote, age, gender, district, chainspaceClient, zenroomContract) => dispatch(signPetition(vote, age, gender, district, chainspaceClient, zenroomContract)), // eslint-disable-line
});

export default translate('petitionSummary', { i18n })(connect(mapStateToProps, mapDispatchToProps)(PetitionSummary));
