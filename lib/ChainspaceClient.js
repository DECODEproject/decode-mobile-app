import axios from 'axios';
import FetchChainspaceTransactionsError from './errors/FetchChainspaceTransactionsError';
import UnexpectedChainspaceError from './errors/UnexpectedChainspaceError';

class ChainspaceClient {
  constructor(url) {
    this.url = url;
  }

  async fetchObjectsOfLastTransaction(contractId) {
    function byTimestamp(one, two) {
      const d1 = new Date(one.timestamp);
      const d2 = new Date(two.timestamp);

      return d2 - d1;
    }

    function byContract(id) {
      return transaction => transaction.transactionJson.contractID === id;
    }

    let response;
    try {
      response = await axios.get(`${this.url}/transactions`);
    } catch (error) {
      throw new UnexpectedChainspaceError();
    }
    if (response.status === 200) {
      const validTransactions = response.data.filter(byContract(contractId)).sort(byTimestamp);

      if (validTransactions.length === 0) {
        return undefined;
      }
      return validTransactions[0].outputs;
    }
    throw new FetchChainspaceTransactionsError();
  }
}

export default ChainspaceClient;
