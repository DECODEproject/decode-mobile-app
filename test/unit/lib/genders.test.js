import { sortedGendersList, genderTranslationKeyFromId, validGender } from '../../../lib/genders';

describe('genders', () => {
  it('sortedGendersList should return a list of available genders sorted alphabetically', () => {
    const sortedList = sortedGendersList();

    const expectedSortedList = [
      ['F', 'female'],
      ['M', 'male'],
      ['O', 'other'],
    ];

    expect(sortedList).toEqual(expectedSortedList);
  });

  it('genderTranslationKeyFromId should return correct name', () => {
    const genderTranslationKey = genderTranslationKeyFromId('F');

    expect(genderTranslationKey).toEqual('female');
  });

  describe('validGender', () => {
    it('should return true if the value is one of the supported genders', () => {
      expect(validGender('O')).toEqual(true);
    });

    it('should return false if the value is not one of supported genders', () => {
      expect(validGender('-')).toEqual(false);
    });
  });
});
