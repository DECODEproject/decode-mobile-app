/*
 * DECODE App – A mobile app to control your personal data
 * Copyright (C) 2019 – Thoughtworks Ltd.
 * Copyright (C) 2019 – DRIBIA Data Research S.L.
 *
 * DECODE App is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DECODE App is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * email: ula@dribia.com
 */

import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {Text, View, ScrollView, Dimensions, Platform} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {signPetitionAction, signPetitionError} from '../application/redux/actions/petition';
import Button from '../application/components/Button/Button';
import Logo from '../application/components/ScreenLogo/ScreenLogo';
import {goToSignOutcome, goToNewAttributes} from '../application/redux/actions/navigation';
import AttributeComponent from '../application/components/Attribute/Attribute';
import PetitionDescription from '../application/components/PetitionDescription/PetitionDescription';
import openPetitionInBrowser from '../application/utils';
import styles from './styles';
import i18n from '../i18n';
import {
  isAttributeEnabled, areAllMandatoryAttrsEnabled,
  pickCredentials,
  buildAttributes, toggleElementsInList, getDisplayValue, getDisplayName
} from '../lib/attributes';
import contract11 from '../assets/contracts/11-CITIZEN-sign-petition.zencode';
import ZenroomExecutor from "../lib/ZenroomExecutor";
import isJson from '../lib/is-json';
import PetitionsClient from '../lib/PetitionsClient';

class PetitionSummary extends React.Component {

  static route = {
    navigationBar: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
      borderBottomColor: 'white',
      elevation: 1,
      fontSize: 20,
      fontWeight: '500',
      tintColor: 'rgb(0,163,158)',
      renderTitle: () => <View  style={{marginLeft: Platform.OS === 'ios' ? -20 : -60,}} ><Logo/></View>,
      height: 80,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      enabledAttributes: [{predicate: props.attributes.mandatory[0].predicate}],
    };
  }

  toggleEnabledAttribute(attr) {
    this.setState({enabledAttributes: toggleElementsInList(attr, this.state.enabledAttributes)});
  }

  async sign(uniqueId, petitionId, vote) {
    if (vote === 'No') {
      await this.props.signPetitionAction();
      this.props.goToSignOutcome();
      return;
    }
    this.setState({
      loading: true,
    });
    try {
      // CONTRACT 11
      const {provenance: {credential, id: issuerId, verify: issuerVerifier}, petitionsUrl} = this.props.credentials[0];
      const c11 = contract11(uniqueId, issuerId, petitionId);
      console.log("Going to execute contract11: ", c11);
      console.log("Keys: ", credential);
      console.log("Data: ", JSON.stringify(issuerVerifier));
      const petitionSignature = await ZenroomExecutor.execute(
        c11,
        JSON.stringify(issuerVerifier),
        credential
      );
      console.log("Response from contract11 (petitionSignature): ", petitionSignature);
      if (! isJson(petitionSignature)) {
        throw new Error("Unexpected response from contract 11");
      }

      // CALL TO PETITIONS SERVICE
      const petitionsClient = new PetitionsClient(petitionsUrl);
      await petitionsClient.sign(petitionId, JSON.parse(petitionSignature));

      await this.props.signPetitionAction();
    } catch(error) {
      await this.props.signPetitionError(error.message);
    }
    this.props.goToSignOutcome();
    this.setState({
      loading: false,
    });
  }

  renderAttribute = (attr, isMandatory) => {
    return (<AttributeComponent
        key={attr.predicate}
        value={getDisplayValue(attr, this.props.t)}
        isMandatory={isMandatory}
        toggleCallback={() => this.toggleEnabledAttribute(attr)}
        isEnabled={isAttributeEnabled(attr, this.state.enabledAttributes)}
        name={getDisplayName(attr.predicate, this.props.t)}
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
      attributes,
    } = this.props;

    const allMandatoryEnabled = areAllMandatoryAttrsEnabled(
      this.state.enabledAttributes,
      attributes.mandatory,
    );

    const {matchedAttributes} = this.props;
    const {uniqueId} = matchedAttributes;
    const petitionAttributesTemplate = (
      <View style={styles.petitionSummaryBox}>
        {matchedAttributes.mandatory.map(attr => this.renderAttribute(attr, true))}
        {matchedAttributes.optional.map(attr => this.renderAttribute(attr))}
        {(matchedAttributes.missing.length !== 0) &&
        <Text style={{marginTop: 20}}>
          {t('optional')}
        </Text>
        }
        {matchedAttributes.missing.map(attr => this.renderMissingAttribute(attr))}
        <Text
          style={{...styles.cancelSigningPetition, alignSelf: 'flex-start'}}
          onPress={() => this.props.goToManageAttributes()}
        >{t('manageData')}
        </Text>
      </View>
    );
    const {height: windowHeight} = Dimensions.get('window');
    return (
      <ScrollView style={styles.petitionSummaryContainer} contentContainerStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: windowHeight-80,
      }}>
        <View style={{
          paddingBottom: 20,
          borderBottomColor: '#809B9B9B',
          borderBottomWidth: 1,
        }}>
          <PetitionDescription title={petition.title} description={petition.description}/>
        </View>

        <View style={{
          paddingVertical: 20,
          borderBottomColor: '#809B9B9B',
          borderBottomWidth: 1,
          flex: 1,
        }}>
          <View>
            <Text style={{fontSize: 14, lineHeight: 20}}>{t('sharing')}</Text>
            <Text style={{fontWeight: 'bold', fontSize: 14, lineHeight: 20}}>Decidim Barcelona.</Text>
          </View>
          <View style={{paddingVertical: 20}}>
            <Text style={{color: '#9B9B9B', fontSize: 14}}>
              <Text style={{color: '#D0021B'}}>*</Text> {t('requiredAttributes')}
            </Text>
          </View>
          <View>
            <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}} textContent={t('loading')}/>
          </View>
          <View>
            {petition && petitionAttributesTemplate}
          </View>
        </View>

        <View style={{
          paddingVertical: 20,
          borderBottomColor: '#809B9B9B',
          borderBottomWidth: 1,
          marginBottom: 40,
          flex: 1,
        }}>

          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button
              enabled={allMandatoryEnabled}
              onPress={() => {
                this.sign(uniqueId, `dddc-test-${petition.id}`, 'No');
              }}
              name={t('no')}
            />
            <Button
              enabled={allMandatoryEnabled}
              onPress={() => {
                this.sign(uniqueId, `dddc-test-${petition.id}`, 'Yes');
              }}
              name={t('yes')}
            />
          </View>
          <Text
            style={styles.cancelSigningPetition}
            onPress={() => openPetitionInBrowser(petition.id)}
          >{t('cancel')}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

PetitionSummary.propTypes = {
  goToSignOutcome: PropTypes.func.isRequired,
  goToManageAttributes: PropTypes.func.isRequired,
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
  signPetitionAction: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  walletAttributes: PropTypes.shape({
    list: PropTypes.instanceOf(Map),
  }).isRequired,
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
  matchedAttributes: buildAttributes(state.attributes.list, state.petition.petition.attributes),
  credentials: pickCredentials(state.attributes.list),
});

const mapDispatchToProps = dispatch => ({
  goToSignOutcome: () => {
    dispatch(goToSignOutcome());
  },
  goToManageAttributes: () => dispatch(goToNewAttributes()),
  signPetitionAction: () => dispatch(signPetitionAction()),
  signPetitionError: err => dispatch(signPetitionError(err)),
});

export default translate('petitionSummary', {i18n})(connect(mapStateToProps, mapDispatchToProps)(PetitionSummary));
