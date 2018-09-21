import Signature from '../../lib/Signature';
import BuildSignatureError from '../../lib/errors/BuildSignatureError';

describe('Signature', () => {
  describe('representation', () => {
    it('should return representation for vote yes with optional data', () => {
      const vote = 'yes';
      const age = 'any';
      const gender = 'm';

      const actualRepresentation = new Signature(vote, age, gender).representation();

      expect(actualRepresentation).toEqual('YES-M-ANY');
    });

    it('should throw an error if vote is invalid', () => {
      const vote = 'maybe';
      const age = 'any';
      const gender = 'any';

      const actualRepresentation = () => new Signature(vote, age, gender).representation();

      expect(actualRepresentation).toThrow(BuildSignatureError);
    });

    it('should throw an error if age is invalid', () => {
      const vote = 'yes';
      const age = 'not an age';
      const gender = 'any';

      const actualRepresentation = () => new Signature(vote, age, gender).representation();

      expect(actualRepresentation).toThrow(BuildSignatureError);
    });

    it('should throw an error if gender is invalid', () => {
      const vote = 'yes';
      const age = 'any';
      const gender = 'not a gender';

      const actualRepresentation = () => new Signature(vote, age, gender).representation();

      expect(actualRepresentation).toThrow(BuildSignatureError);
    });
  });
});
