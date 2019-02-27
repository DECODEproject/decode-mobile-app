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

export function validDistrict(district) {
  return district in districts;
}
