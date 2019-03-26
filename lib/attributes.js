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

import moment from 'moment';
import {districtNameFromId} from "./districts";
import {mapGenderIdToName} from "./genders";

const getAge = (dateString) => {
  const start = moment(dateString, 'DD/MM/YYYY');
  const end = moment();

  const duration = moment.duration(end.diff(start));
  return Math.floor(duration.asYears());
};

const getAttributeIndex = (attr, list) => (
  list.findIndex(listAttr => listAttr.predicate === attr.predicate));

export const toggleElementsInList = (element, list) => {
  const indexOfElement = getAttributeIndex(element, list);
  if (indexOfElement !== -1) {
    list.splice(indexOfElement, 1);
  } else {
    list.push(element);
  }
  return list.slice(0);
};

export const isAttributeEnabled = (attr, enabledAttrs) => (
  attr !== undefined &&
  !!enabledAttrs.find(enabledAttr => enabledAttr.predicate === attr.predicate));

export const getEnabledAttributeValue = (attr, enabledAttrs) => {
  if (isAttributeEnabled(attr, enabledAttrs)) {
    return attr.object;
  }
  return 'any';
};

export const areAllMandatoryAttrsEnabled = (enabledAttrs, mandatoryAttrs) =>
  mandatoryAttrs.reduce((memo, attr) => memo && isAttributeEnabled(attr, enabledAttrs), true);

export const formAgeRange = attributeValue => {
  const age = getAge(attributeValue);

  if (age <= 19) {
    return '0-19';
  } else if (age <= 29) {
    return '20-29';
  } else if (age <= 39) {
    return '30-39';
  }
  return '40+';
};

export const formAge = (attr, enabledAttrs) => {
  let age = getEnabledAttributeValue(attr, enabledAttrs);
  if (age !== 'any') {
    age = formAgeRange(attr);
  }
  return age;
};

export const findAttribute = (predicate, attributes) =>
  attributes.find(attribute => attribute.predicate === predicate);

const matchPetitionAttrWithWallet = (petitionAttrs, walletAttrs) => {
  if (!petitionAttrs) return [];
  const matchedAttrs = [];
  petitionAttrs.forEach((attr) => {
    if (walletAttrs.get(attr.predicate)) matchedAttrs.push(walletAttrs.get(attr.predicate));
  });
  return matchedAttrs;
};

const findMissingAttr = (allPetitionAttrs, allMatchedAttrs) => {
  if (!allPetitionAttrs) return [];
  return allPetitionAttrs.filter(attr =>
    !allMatchedAttrs.find(matchAttr => matchAttr.predicate === attr.predicate));
};

export const buildAttributes = (walletAttrs, petitionAttrs) => {
  const mandatory = matchPetitionAttrWithWallet(petitionAttrs.mandatory, walletAttrs);
  const uniqueId = mandatory.length > 0 ? mandatory[0].subject : null;
  const optional = matchPetitionAttrWithWallet(petitionAttrs.optional, walletAttrs);

  const allPetitionAttrs = petitionAttrs.mandatory.concat(petitionAttrs.optional);
  const allMatchedAttrs = mandatory.concat(optional);

  const missing = findMissingAttr(allPetitionAttrs, allMatchedAttrs);

  return { mandatory, optional, missing, uniqueId };
};

export const pickCredentials = (attributeListMap) => {
  let attributeListValues = attributeListMap.values();
  let credentials = [];
  for (let item of attributeListValues ) {
    if (item.provenance.source !== 'wallet') credentials.push(item);
  }
  return credentials;
};

export const pickAttributes = (attributeListMap) => {
  let attributeListValues = attributeListMap.values();
  let credentials = [];
  for (let item of attributeListValues ) {
    if (item.provenance.source === 'wallet') credentials.push(item);
  }
  return credentials;
};

export const getDisplayName = (predicate, t) => {
  return t(predicate) === predicate ? t(`schema:${predicate}`) : t(predicate);
};

export const getApiName = predicate => {
  switch (predicate) {
    case 'schema:dateOfBirth':
      return 'age';
    case 'schema:district':
      return 'district';
    case 'schema:gender':
      return 'gender';
    default:
      return t(`schema:${object}`);
  }
}

export const getDisplayValue = ({predicate, object}, t) => {
  switch (predicate) {
    case 'schema:dateOfBirth':
      return `${t('age')}: ${formAgeRange(object)}`;
    case 'schema:district':
      return districtNameFromId(object);
    case 'schema:gender':
      return mapGenderIdToName(object, t);
    default:
      return t(`schema:${object}`);
  }
};

export const getApiValue = ({predicate, object}) => {
  switch (predicate) {
    case 'schema:dateOfBirth':
      return `${formAgeRange(object)}`;
    default:
      return object;
  }
};