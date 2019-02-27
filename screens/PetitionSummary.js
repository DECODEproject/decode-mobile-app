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
import {Constants} from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import {Text, View, ScrollView, Dimensions, Platform} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {signPetition} from '../application/redux/actions/petition';
import Button from '../application/components/Button/Button';
import Logo from '../application/components/ScreenLogo/ScreenLogo';
import {goToSignOutcome, goToNewAttributes} from '../application/redux/actions/navigation';
import AttributeComponent from '../application/components/Attribute/Attribute';
import PetitionDescription from '../application/components/PetitionDescription/PetitionDescription';
import getChainspaceUrl from '../config';
import {districtNameFromId} from '../lib/districts';
import {mapGenderIdToName} from '../lib/genders';
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

const chainspaceUrl = getChainspaceUrl(Constants.manifest.releaseChannel);

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
      enabledAttributes: [{predicate: 'schema:addressLocality'}],
    };
  }

  toggleEnabledAttribute(attr) {
    this.setState({enabledAttributes: toggleElementsInList(attr, this.state.enabledAttributes)});
  }

  async sign(petition, walletId, vote) {
    this.setState({
      loading: true,
    });

    const attributes = [...this.props.matchedAttributes.optional,
      ...this.props.matchedAttributes.missing,
      ...this.props.matchedAttributes.mandatory];

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

    if (attr.predicate === 'schema:gender') {
      displayValue = mapGenderIdToName(attr.object, this.props.t);
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

    const {matchedAttributes} = this.props;
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
                this.sign(petition, walletId, 'No');
              }}
              name={t('no')}
            />
            <Button
              enabled={allMandatoryEnabled}
              onPress={() => {
                this.sign(petition, walletId, 'Yes');
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
  matchedAttributes: buildAttributes(state.attributes.list, state.petition.petition.attributes),
  chainspaceClient: new ChainspaceClient(chainspaceUrl),
  zenroomContract: new ZenroomContract(),
});

const mapDispatchToProps = dispatch => ({
  goToSignOutcome: () => {
    dispatch(goToSignOutcome());
  },
  goToManageAttributes: () => dispatch(goToNewAttributes()),
  signPetition: (vote, age, gender, district, chainspaceClient, zenroomContract) => dispatch(signPetition(vote, age, gender, district, chainspaceClient, zenroomContract)), // eslint-disable-line
});

export default translate('petitionSummary', {i18n})(connect(mapStateToProps, mapDispatchToProps)(PetitionSummary));
