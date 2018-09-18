class BuildSignatureError extends Error {
  constructor(message) {
    super(message || 'There was an error building the signature');
  }
}

export default BuildSignatureError;
