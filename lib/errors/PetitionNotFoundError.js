class PetitionNotFoundError {
  constructor(message) {
    this.message = message || 'Could not find petition';
  }
}

export default PetitionNotFoundError;
