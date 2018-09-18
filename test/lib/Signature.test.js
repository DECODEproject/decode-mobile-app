import Signature from '../../lib/Signature';
import BuildSignatureError from '../../lib/errors/BuildSignatureError';

describe('Signature', () => {
  const buildArray = index => Array.from({ length: 40 }, (v, i) => (index === i ? 1 : 0));

  describe('binaryRepresentation', () => {
    it('should return representation for vote yes without optional data', () => {
      const vote = 'yes';
      const age = 'any';
      const gender = 'any';

      const actualRepresentation = new Signature(vote, age, gender).binaryRepresentation();

      const yesAnyAnyIndex = 0;
      const expectedRepresentation = buildArray(yesAnyAnyIndex);

      expect(actualRepresentation).toEqual(expectedRepresentation);
    });

    it('should return representation for vote no without optional data', () => {
      const vote = 'no';
      const age = 'any';
      const gender = 'any';

      const actualRepresentation = new Signature(vote, age, gender).binaryRepresentation();

      const noAnyAnyIndex = 20;
      const expectedRepresentation = buildArray(noAnyAnyIndex);

      expect(actualRepresentation).toEqual(expectedRepresentation);
    });

    it('should return representation for vote no with optional data', () => {
      const vote = 'no';
      const age = '40+';
      const gender = 'undisclosed';

      const actualRepresentation = new Signature(vote, age, gender).binaryRepresentation();

      const voteIndex = 39;
      const expectedRepresentation = buildArray(voteIndex);

      expect(actualRepresentation).toEqual(expectedRepresentation);
    });

    it('should accept upper and lower case', () => {
      const vote = 'Yes';
      const age = 'Any';
      const gender = 'Any';

      const actualRepresentation = new Signature(vote, age, gender).binaryRepresentation();

      const yesAnyAnyIndex = 0;
      const expectedRepresentation = buildArray(yesAnyAnyIndex);

      expect(actualRepresentation).toEqual(expectedRepresentation);
    });

    it('should throw an error if vote is invalid', () => {
      const vote = 'maybe';
      const age = 'any';
      const gender = 'any';

      const actualRepresentation = () => new Signature(vote, age, gender).binaryRepresentation();

      expect(actualRepresentation).toThrow(BuildSignatureError);
    });

    it('should throw an error if age is invalid', () => {
      const vote = 'yea';
      const age = 'not an age';
      const gender = 'any';

      const actualRepresentation = () => new Signature(vote, age, gender).binaryRepresentation();

      expect(actualRepresentation).toThrow(BuildSignatureError);
    });

    it('should throw an error if gender is invalid', () => {
      const vote = 'yea';
      const age = 'any';
      const gender = 'not a gender';

      const actualRepresentation = () => new Signature(vote, age, gender).binaryRepresentation();

      expect(actualRepresentation).toThrow(BuildSignatureError);
    });
  });
});
