class CredentialIssuerError {
  constructor(message) {
    this.message = message || 'There was an error calling the credential issuer';
  }
}

export default CredentialIssuerError;
