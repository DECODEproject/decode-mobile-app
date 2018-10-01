export default class UnexpectedChainspaceError {
  constructor(message) {
    this.message = message || 'Error connecting to Chainspace API';
  }
}
