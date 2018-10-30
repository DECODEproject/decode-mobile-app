const genders = {
  F: 'female',
  M: 'male',
  O: 'other',
};

export function sortedGendersList() {
  const alphabeticalComparator = (a, b) => (a[1] > b[1] ? 1 : -1);

  return Object.entries(genders)
    .sort(alphabeticalComparator);
}

export function genderTranslationKeyFromId(id) {
  return genders[id];
}

export function validGender(gender) {
  return gender in genders;
}
