export default class FetchChainspaceTransactionsError extends Error {
  constructor(message) {
    super(message || 'Could not retrieve chainspace data');
  }
}
