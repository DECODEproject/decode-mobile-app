import BuildSignatureError from './errors/BuildSignatureError';

export default class Signature {
  constructor(vote, gender, age, district) {
    this.vote = vote;
    this.age = age;
    this.gender = gender;
    this.district = district;
    this.validVotes = new Set(['YES', 'NO']);
    this.validGenders = new Set(['ANY']); // , 'M', 'F', 'U']);
    this.validAges = new Set(['ANY']); // , '0-19', '20-29', '30-39', '40+']);
    this.validDistricts = new Set(['ANY', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  }

  representation() {
    const vote = this.vote.toUpperCase();
    const gender = this.gender.toUpperCase();
    const age = this.age.toUpperCase();
    const district = this.district.toUpperCase();
    const isValidVote = v => this.validVotes.has(v);
    const isValidGender = g => this.validGenders.has(g);
    const isValidAge = a => this.validAges.has(a);
    const isValidDistrict = d => this.validDistricts.has(d);

    if (!isValidVote(vote)) {
      throw new BuildSignatureError("this vote option does not exist please vote 'yes' or 'no'");
    }

    if (!isValidGender(gender)) {
      throw new BuildSignatureError("this gender option does not exist please choose 'female' or 'male' or 'any' or 'undisclosed'");
    }

    if (!isValidAge(age)) {
      throw new BuildSignatureError("this age option does not exist please choose '0-19' or '20-29' or '30-39' or '40+' or 'any'");
    }

    if (!isValidDistrict(district)) {
      throw new BuildSignatureError("this district option does not exist please choose '1' or '2' or '3' or '4' or '5' or '6' or '7' or '8' or '9' or '10' or 'any'");
    }

    return `${vote}-${gender}-${age}-${district}`;
  }
}
