import React from 'react';
import { Constants } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { getPetition, signPetition } from '../application/redux/actions/petition';
import { setSignOutcome } from '../application/redux/actions/signOutcome';
import { bubbleUpRequiredAttributeToggle, bubbleUpOptionalAttributeToggle } from '../application/redux/actions/attributes';
import Button from '../application/components/Button/Button';
import { goToSignOutcome } from '../application/redux/actions/navigation';
import AttributeComponent from '../application/components/Attribute/Attribute';
import getWalletProxyUrl from '../config';
import openPetitionInBrowser from '../application/utils';
import styles from './styles';
import i18n from '../i18n';


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

    const age = (this.props.attributes.optionalAttributesToggleStatus.age) ? '20-29' : 'any';
    const gender = (this.props.attributes.optionalAttributesToggleStatus.gender) ? 'female' : 'any';

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
        <AttributeComponent
          isMandatory
          toggleCallback={this.props.bubbleUpRequiredAttributeToggle}
          isEnabled={this.props.attributes.isRequiredAttributeEnabled}
          name={this.props.t('residencyAttribute')}
        />
        <Text>
          {this.props.t('optional')}
        </Text>
        <AttributeComponent
          isMandatory={false}
          toggleCallback={this.props.bubbleUpAgeAttributeToggle}
          isEnabled={this.props.attributes.optionalAttributesToggleStatus.age}
          name={this.props.t('ageAttribute')}
        />
        <AttributeComponent
          isMandatory={false}
          toggleCallback={this.props.bubbleUpGenderAttributeToggle}
          isEnabled={this.props.attributes.optionalAttributesToggleStatus.gender}
          name={this.props.t('genderAttribute')}
        />
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
  petitionError: PropTypes.string,
  getPetition: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
  attributes: PropTypes.shape({
    isRequiredAttributeEnabled: PropTypes.bool,
    optionalAttributesToggleStatus: PropTypes.shape({
      age: PropTypes.bool,
      gender: PropTypes.bool,
    }),
    list: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  signPetition: PropTypes.func.isRequired,
  bubbleUpRequiredAttributeToggle: PropTypes.func.isRequired,
  bubbleUpAgeAttributeToggle: PropTypes.func.isRequired,
  bubbleUpGenderAttributeToggle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

PetitionSummary.defaultProps = {
  petition: undefined,
  petitionError: undefined,
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
  petition: state.petition.petition,
  petitionError: state.petition.error,
  petitionAttributes: state.petition.petitionAttributes,
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
  bubbleUpRequiredAttributeToggle: toggleValue =>
    dispatch(bubbleUpRequiredAttributeToggle(toggleValue)),
  bubbleUpAgeAttributeToggle: toggleValue =>
    dispatch(bubbleUpOptionalAttributeToggle('age', toggleValue)),
  bubbleUpGenderAttributeToggle: toggleValue =>
    dispatch(bubbleUpOptionalAttributeToggle('gender', toggleValue)),
});

export default translate('petitionSummary', { i18n })(connect(mapStateToProps, mapDispatchToProps)(PetitionSummary));
