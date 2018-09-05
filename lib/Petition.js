class Petition {
  constructor(participatoryProcess) {
    this.id = participatoryProcess.id;
    this.title = participatoryProcess.title.translation;
    this.mandatoryAttributes = [{
      predicate: 'schema:addressLocality',
      object: 'Barcelona',
      scope: 'can-access',
      provenance: {
        url: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
      },
    }];
    this.optionalAttributes = [{
      predicate: 'schema:dateOfBirth',
      object: 'voter',
      scope: 'can-access',
    }];
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      attributes: {
        mandatory: this.mandatoryAttributes,
        optional: this.optionalAttributes,
      },
    };
  }
}

export default Petition;
