class FetchPetitionError extends Error {
  constructor(message) {
    super(message || 'Could not retrieve petition details');
  }
}

export default FetchPetitionError;
