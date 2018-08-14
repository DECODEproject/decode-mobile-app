import { isAttributeEnabled, areAllMandatoryAttrsEnabled, getEnabledAttributeValue, formAgeRange } from '../../../../../application/utils/attributeManagement';


describe('getEnabledAttributeValue', () => {
  const attr = {
    predicate: 'schema:hello',
    object: 'hola mundo!',
  };


  it('should return any, if attr is not enabled', () => {
    const expected = 'any';
    const actual = getEnabledAttributeValue(attr, []);

    expect(actual).toEqual(expected);
  });

  it('should return hello world, if attr is enabled', () => {
    const expected = 'hola mundo!';
    const actual = getEnabledAttributeValue(attr, [{ predicate: 'schema:hello' }]);

    expect(actual).toEqual(expected);
  });
});

describe('formAgeRange', () => {
  it('should return 0-19 if age is enabled and person is between 0-19 years old', () => {
    const attr = {
      predicate: 'schema:dateOfBirth',
      object: '01/01/2000',
    };

    const expected = '0-19';
    const actual = formAgeRange(attr);

    expect(actual).toEqual(expected);
  });

  it('should return 40+ if age is enabled and person is over 40 years old', () => {
    const attr = {
      predicate: 'schema:dateOfBirth',
      object: '01/01/1966',
    };

    const expected = '40+';
    const actual = formAgeRange(attr);

    expect(actual).toEqual(expected);
  });
});

describe('isAttributeEnabled', () => {
  it('should return if the attribute is enable', () => {
    const attr = {
      predicate: 'schema:dateOfBirth',
      object: '01/01/1966',
    };
    const enabledAttributes = [{ predicate: 'schema:dateOfBirth' }];

    const actual = isAttributeEnabled(attr, enabledAttributes);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('should return false if the attribute is not enabled!', () => {
    const attr = {
      predicate: 'schema:dateOfBirth',
      object: '01/01/1966',
    };
    const enabledAttributes = [];

    const actual = isAttributeEnabled(attr, enabledAttributes);
    const expected = false;

    expect(actual).toEqual(expected);
  });
});

describe('areAllMandatoryAttrsEnabled', () => {
  const attrAge = {
    predicate: 'schema:dateOfBirth',
    object: '01/01/1966',
  };

  const attrGender = {
    predicate: 'schema:gender',
    object: 'female',
  };

  it('should return true, if there is no attributes', () => {
    const actual = areAllMandatoryAttrsEnabled([], []);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('should return true, if all mandatory attributes are enabled', () => {
    const actual = areAllMandatoryAttrsEnabled([{ predicate: 'schema:dateOfBirth' }, { predicate: 'schema:gender' }], [attrAge, attrGender]);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('should return false, if not all mandatory attributes are enabled', () => {
    const actual = areAllMandatoryAttrsEnabled([{ predicate: 'schema:gender' }], [attrAge, attrGender]);
    const expected = false;

    expect(actual).toEqual(expected);
  });
});
