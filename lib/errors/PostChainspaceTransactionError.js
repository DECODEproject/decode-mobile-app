export default class PostChainspaceTransactionError extends Error {
  constructor(message) {
    super(message || 'Could not post to chainspace');
  }
}
