import { sortedDistrictsList, districtNameFromId, validDistrict } from '../../../lib/districts';

describe('districts', () => {
  it('sortedDistrictsList should return a list of districts sorted alphabetically', () => {
    const sortedList = sortedDistrictsList();

    const expectedSortedList = [
      ['1', 'Ciutat Vella'],
      ['2', 'Eixample'],
      ['6', 'Gràcia'],
      ['7', 'Horta-Guinardó'],
      ['4', 'Les Corts'],
      ['8', 'Nou Barris'],
      ['9', 'Sant Andreu'],
      ['10', 'Sant Martí'],
      ['3', 'Sants-Montjuïc'],
      ['5', 'Sarrià-Sant Gervasi'],
    ];
    expect(sortedList).toEqual(expectedSortedList);
  });

  it('districtNameFromId should return correct name', () => {
    const districtName = districtNameFromId('4');

    expect(districtName).toEqual('Les Corts');
  });

  describe('validDistrict', () => {
    it('should return true if the value is one of the Barcelona districts', () => {
      expect(validDistrict('1')).toEqual(true);
    });

    it('should return false if the value is not one of the Barcelona districts', () => {
      expect(validDistrict('0')).toEqual(false);
    });
  });
});
