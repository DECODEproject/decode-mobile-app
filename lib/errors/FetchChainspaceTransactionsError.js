export default class FetchChainspaceTransactionsError {
  constructor(message) {
    this.message = message || 'Could not retrieve chainspace data';
  }
}
