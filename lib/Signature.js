import BuildSignatureError from './errors/BuildSignatureError';

export default class Signature {
  constructor(vote, age, gender) {
    this.vote = vote;
    this.age = age;
    this.gender = gender;
    this.votesTable = {
      yes: 0,
      no: 1,
    };
    this.gendersTable = {
      any: 0,
      male: 1,
      female: 2,
      undisclosed: 3,
    };
    this.agesTable = {
      any: 0,
      '0-19': 1,
      '20-29': 2,
      '30-39': 3,
      '40+': 4,
    };
  }

  getVoteIndex() {
    const vote = this.vote.toLowerCase();
    if (!(vote in this.votesTable)) {
      throw new BuildSignatureError("this vote option does not exist please vote 'yes' or 'no'");
    }
    return this.votesTable[vote];
  }

  getGenderIndex() {
    const gender = this.gender.toLowerCase();
    if (!(gender in this.gendersTable)) {
      throw new BuildSignatureError("this gender option does not exist please choose 'female' or 'male' or 'any' or 'undisclosed'");
    }
    return this.gendersTable[gender];
  }

  getAgeIndex() {
    const age = this.age.toLowerCase();
    if (!(age in this.agesTable)) {
      throw new BuildSignatureError("this age option does not exist please choose '0-19' or '20-29' or '30-39' or '40+' or 'any'");
    }
    return this.agesTable[age];
  }

  calculateIndexOfVote() {
    const voteIndexOffset = Object.keys(this.gendersTable).length *
      Object.keys(this.agesTable).length;
    const genderIndexOffset = Object.keys(this.agesTable).length;

    return (voteIndexOffset * this.getVoteIndex()) +
      (genderIndexOffset * this.getGenderIndex()) +
      this.getAgeIndex();
  }


  binaryRepresentation() {
    const buildRepresentation = (length, index) => Array.from({ length }, (v, i) => (index === i ? 1 : 0)); //eslint-disable-line

    const totalCombinations = Object.keys(this.votesTable).length *
      Object.keys(this.gendersTable).length *
        Object.keys(this.agesTable).length;


    return buildRepresentation(totalCombinations, this.calculateIndexOfVote());
  }
}
