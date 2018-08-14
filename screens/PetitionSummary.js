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
import {
  isAttributeEnabled, areAllMandatoryAttrsEnabled, formAge,
  formAgeRange, getEnabledAttributeValue,
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
    };
  }

  componentDidMount() {
    this.props.getPetition(this.props.petitionLink);
  }

  async sign(petition, walletId, vote) {
    this.setState({
      loading: true,
    });

    const age = formAge(this.props.enabledAttributes);
    const gender = getEnabledAttributeValue({ predicate: 'schema:gender' }, this.props.enabledAttributes);

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
      toggleCallback={() => this.props.toggleEnableAttribute(attr)}
      isEnabled={isAttributeEnabled(attr, this.props.enabledAttributes)}
      name={`${this.props.t(attr.predicate)} - ${valueToShow}`}
    />
    );
  };

  renderMissingAttribute = attr => (
    <Text style={styles.missingAttribute} key={attr.predicate}> {`${this.props.t(attr.predicate)}`} </Text>
  );

  render() {
    const {
      enabledAttributes,
      petitionAttributes,
      petition,
      petitionError,
      t,
      walletId,
    } = this.props;
    const petitionAttributesTemplate = (
      <View style={styles.petitionSummaryBox}>
        <Text style={styles.petitionSummaryPetitionTitle}>{petition.title}</Text>
        <Text style={styles.petitionDescription}>
          {t('title')}
        </Text>
        <Text>
          {t('description')}
        </Text>
        { petitionAttributes.mandatory.map(attr => this.renderAttribute(attr, true)) }
        <Text>
          {t('optional')}
        </Text>
        { petitionAttributes.optional.map(attr => this.renderAttribute(attr)) }
        { petitionAttributes.missing.map(attr => this.renderMissingAttribute(attr)) }
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
            enabled={areAllMandatoryAttrsEnabled(enabledAttributes, petitionAttributes.mandatory)}
            onPress={() => { this.sign(petition, walletId, 'Yes'); }}
            name={t('yes')}
            style={{
              flex: 1,
            }}
          />
          <Button
            enabled={areAllMandatoryAttrsEnabled(enabledAttributes, petitionAttributes.mandatory)}
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
  enabledAttributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  petitionError: PropTypes.string,
  getPetition: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
  signPetition: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  toggleEnableAttribute: PropTypes.func.isRequired,
  petitionAttributes: PropTypes.shape({
    mandatory: PropTypes.arrayOf(PropTypes.shape({})),
    optional: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

PetitionSummary.defaultProps = {
  petition: undefined,
  petitionError: undefined,
  petitionAttributes: {
    mandatory: [],
    optional: [],
    missing: [],
  },
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
  petition: state.petition.petition,
  petitionError: state.petition.error,
  petitionAttributes: state.petition.petitionAttributes,
  enabledAttributes: state.petition.enabledAttributes,
  walletId: state.wallet.id,
  signSuccess: state.signSuccess,
});

const mapDispatchToProps = dispatch => ({
  getPetition: (petitionLink) => { dispatch(getPetition(petitionLink)); },
  setSignOutcome: (signSuccess) => { dispatch(setSignOutcome(signSuccess)); },
  goToSignOutcome: () => { dispatch(goToSignOutcome()); },
  signPetition: (petition, walletId, vote, age, gender) =>
    dispatch(signPetition(petition, walletId, walletProxyLink, vote, age, gender)),
  toggleEnableAttribute: (attr) => { dispatch(toggleEnableAttribute(attr)); },
});

export default translate('petitionSummary', { i18n })(connect(mapStateToProps, mapDispatchToProps)(PetitionSummary));
