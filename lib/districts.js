const districts = {
  1: 'Ciutat Vella',
  2: 'Eixample',
  3: 'Sants-Montjuïc',
  4: 'Les Corts',
  5: 'Sarrià-Sant Gervasi',
  6: 'Gràcia',
  7: 'Horta-Guinardó',
  8: 'Nou Barris',
  9: 'Sant Andreu',
  10: 'Sant Martí',
};

export function sortedDistrictsList() {
  const alphabeticalComparator = (a, b) => (a[1] > b[1] ? 1 : -1);

  return Object.entries(districts)
    .sort(alphabeticalComparator);
}

export function districtNameFromId(id) {
  return districts[id];
}
