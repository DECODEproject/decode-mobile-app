import moment from 'moment';

const getAge = (dateString) => {
  const start = moment(dateString, 'DD/MM/YYYY');
  const end = moment();

  const duration = moment.duration(end.diff(start));
  return Math.floor(duration.asYears());
};

export const isAttributeEnabled = (attr, enabledAttrs) => (
  !!enabledAttrs.find(enabledAttr => enabledAttr.predicate === attr.predicate));

export const getEnabledAttributeValue = (attr, enabledAttrs) => {
  if (isAttributeEnabled(attr, enabledAttrs)) {
    return attr.object;
  }
  return 'any';
};

export const areAllMandatoryAttrsEnabled = (enabledAttrs, mandatoryAttrs) =>
  mandatoryAttrs.reduce((memo, attr) => memo && isAttributeEnabled(attr, enabledAttrs), true);

export const formAgeRange = (attr) => {
  const attributeValue = attr.object;
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
  const optional = matchPetitionAttrWithWallet(petitionAttrs.optional, walletAttrs);

  const allPetitionAttrs = petitionAttrs.mandatory.concat(petitionAttrs.optional);
  const allMatchedAttrs = mandatory.concat(optional);

  const missing = findMissingAttr(allPetitionAttrs, allMatchedAttrs);

  return { mandatory, optional, missing };
};
