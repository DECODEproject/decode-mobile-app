class PetitionNotFoundError extends Error {
  constructor(message) {
    super(message || 'Could not find petition');
  }
}

export default PetitionNotFoundError;
