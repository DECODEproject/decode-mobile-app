class Petition {
  constructor(participatoryProcess, language) {
    this.id = participatoryProcess.id;
    this.title = participatoryProcess.title[language] || participatoryProcess.title.es;
    this.description = participatoryProcess.description[language] ||
       participatoryProcess.description.es;
    this.mandatoryAttributes = participatoryProcess.json_schema.mandatory;
    this.optionalAttributes = participatoryProcess.json_schema.optional;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      attributes: {
        mandatory: this.mandatoryAttributes,
        optional: this.optionalAttributes,
      },
    };
  }
}

export default Petition;
