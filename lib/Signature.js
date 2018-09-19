import BuildSignatureError from './errors/BuildSignatureError';

export default class Signature {
  constructor(vote, age, gender) {
    this.vote = vote;
    this.age = age;
    this.gender = gender;
    this.validVotes = new Set(['YES', 'NO']);
    this.validGenders = new Set(['ANY', 'M', 'F', 'U']);
    this.validAges = new Set(['ANY', '0-19', '20-29', '30-39', '40+']);
  }

  representation() {
    const vote = this.vote.toUpperCase();
    const gender = this.gender.toUpperCase();
    const { age } = this;
    const isValidVote = v => this.validVotes.has(v);
    const isValidGender = g => this.validGenders.has(g);
    const isValidAge = a => this.validAges.has(a);

    if (!isValidVote(vote)) {
      throw new BuildSignatureError("this vote option does not exist please vote 'yes' or 'no'");
    }

    if (!isValidGender(gender)) {
      throw new BuildSignatureError("this gender option does not exist please choose 'female' or 'male' or 'any' or 'undisclosed'");
    }

    if (!isValidAge(age)) {
      throw new BuildSignatureError("this age option does not exist please choose '0-19' or '20-29' or '30-39' or '40+' or 'any'");
    }
    return `${vote}-${gender}-${age}`;
  }
}
