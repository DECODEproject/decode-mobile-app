import React from 'react';
import { Constants } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPetition, signPetition } from '../application/redux/actions/petition';
import { setSignOutcome } from '../application/redux/actions/signOutcome';
import { bubbleUpRequiredAttributeToggle, bubbleUpOptionalAttributeToggle } from '../application/redux/actions/attributes';
import Button from '../application/components/Button/Button';
import { goToSignOutcome } from '../application/redux/actions/navigation';
import AttributeComponent from '../application/components/Attribute/Attribute';
import getWalletProxyUrl from '../config';
import openPetitionInBrowser from '../application/utils';
import styles from './styles';


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
          To sign this petition you must consent to sharing the following with Decidim.
        </Text>
        <Text>
          This information is anonymised - Decidim will not receive any personally identifying data.
        </Text>
        <AttributeComponent
          isMandatory
          toggleCallback={this.props.bubbleUpRequiredAttributeToggle}
          isEnabled={this.props.attributes.isRequiredAttributeEnabled}
          name="Your residency status (required)"
        />
        <Text>
          Optional data to share:
        </Text>
        <AttributeComponent
          isMandatory={false}
          toggleCallback={this.props.bubbleUpAgeAttributeToggle}
          isEnabled={this.props.attributes.optionalAttributesToggleStatus.age}
          name="Age (20-29)"
        />
        <AttributeComponent
          isMandatory={false}
          toggleCallback={this.props.bubbleUpGenderAttributeToggle}
          isEnabled={this.props.attributes.optionalAttributesToggleStatus.gender}
          name="Gender (Female)"
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
            name="Yes"
            style={{
              flex: 1,
            }}
          />
          <Button
            enabled={this.props.attributes.isRequiredAttributeEnabled}
            onPress={() => { this.sign(this.props.petition, this.props.walletId, 'No'); }}
            name="No"
            style={{
              flex: 1,
            }}
          />
        </View>
        <Text
          style={styles.cancelSigningPetition}
          onPress={() => openPetitionInBrowser(this.props.petition.id)}
        >Or, cancel signing this petition
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
};

PetitionSummary.defaultProps = {
  petition: undefined,
  petitionError: undefined,
};

const mapStateToProps = state => ({
  petitionLink: state.petitionLink.petitionLink,
  petition: state.petition.petition,
  petitionError: state.petition.error,
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

export default connect(mapStateToProps, mapDispatchToProps)(PetitionSummary);
