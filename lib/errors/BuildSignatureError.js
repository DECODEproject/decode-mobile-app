class BuildSignatureError {
  constructor(message) {
    this.message = message || 'There was an error building the signature';
  }
}

export default BuildSignatureError;
