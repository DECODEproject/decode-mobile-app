export default class UnexpectedChainspaceError extends Error {
  constructor(message) {
    super(message || 'Error connecting to Chainspace API');
  }
}
