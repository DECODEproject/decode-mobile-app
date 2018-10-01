export default class PostChainspaceTransactionError {
  constructor(message) {
    this.message = message || 'Could not post to chainspace';
  }
}
