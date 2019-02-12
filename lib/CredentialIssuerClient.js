import CredentialIssuerError from './errors/CredentialIssuerError';

class CredentialIssuerClient {
  constructor(url) {
    this.url = url;
  }

  issueCredential(data) {
    if (data.DNI === 'error') {
      throw new CredentialIssuerError('Credential Issuer Test Error Message');
    } else {
      return {
        "credential": data.DNI
      }
    }
  }
}

export default CredentialIssuerClient;