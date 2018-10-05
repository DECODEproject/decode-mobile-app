import Signature from '../../lib/Signature';
import BuildSignatureError from '../../lib/errors/BuildSignatureError';

describe('Signature', () => {
  describe('representation', () => {
    it('should return representation for vote yes with optional data', () => {
      const vote = 'yes';
      const age = 'any';
      const gender = 'any';
      const district = '3';

      const actualRepresentation = new Signature(vote, gender, age, district).representation();

      expect(actualRepresentation).toEqual('YES-ANY-ANY-3');
    });

    it('should throw an error if vote is invalid', () => {
      const vote = 'maybe';
      const age = 'any';
      const gender = 'any';
      const district = '3';

      const actualRepresentation = () => new Signature(
        vote,
        gender,
        age,
        district,
      ).representation();

      expect(actualRepresentation).toThrow(BuildSignatureError);
    });

    it('should throw an error if age is invalid', () => {
      const vote = 'yes';
      const age = 'not an age';
      const gender = 'any';
      const district = '3';

      const actualRepresentation = () => new Signature(
        vote,
        gender,
        age,
        district,
      ).representation();

      expect(actualRepresentation).toThrow(BuildSignatureError);
    });

    it('should throw an error if gender is invalid', () => {
      const vote = 'yes';
      const age = 'any';
      const gender = 'not a gender';
      const district = '3';

      const actualRepresentation = () => new Signature(
        vote,
        gender,
        age,
        district,
      ).representation();

      expect(actualRepresentation).toThrow(BuildSignatureError);
    });

    it('should throw an error if district is invalid', () => {
      const vote = 'yes';
      const age = 'any';
      const gender = 'any';
      const district = 'not a district';

      const actualRepresentation = () => new Signature(
        vote,
        gender,
        age,
        district,
      ).representation();

      expect(actualRepresentation).toThrow(BuildSignatureError);
    });
  });
});
