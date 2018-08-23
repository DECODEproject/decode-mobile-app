export default class Attribute {
  constructor(attributeDefinition, credential, walletId) {
    this.predicate = attributeDefinition.predicate;
    this.object = attributeDefinition.object;
    this.scope = attributeDefinition.scope;
    this.source = attributeDefinition.provenance.url;
    this.credential = credential;
    this.subject = walletId;
  }

  toJSON() {
    return {
      predicate: this.predicate,
      object: this.object,
      scope: this.scope,
      provenance: {
        source: this.source,
        credentials: this.credential,
      },
      subject: this.subject,
    };
  }
}
