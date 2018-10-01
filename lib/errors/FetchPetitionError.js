class FetchPetitionError {
  constructor(message) {
    this.message = message || 'Could not retrieve petition details';
  }
}

export default FetchPetitionError;
