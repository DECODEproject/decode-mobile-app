const getAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
};

export const isAttributeEnabled = (attr, enabledAttrs) => (
  !!enabledAttrs.find(enabledAttr => enabledAttr.predicate === attr.predicate));

export const getEnabledAttributeValue = (attr, enabledAttrs) => {
  if (isAttributeEnabled(attr, enabledAttrs)) {
    return attr.object;
  }
  return 'any';
};

export const formAge = (enabledAttrs) => {
  let age = getEnabledAttributeValue({ predicate: 'schema:dateOfBirth' }, enabledAttrs);
  if (age !== 'any') {
    age = this.formAgeRange({ predicate: 'schema:dateOfBirth' });
  }
  return age;
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
