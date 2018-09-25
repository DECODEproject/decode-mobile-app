import axios from 'axios';
import moment from 'moment';
import FetchChainspaceTransactionsError from './errors/FetchChainspaceTransactionsError';
import UnexpectedChainspaceError from './errors/UnexpectedChainspaceError';
import PostChainspaceTransactionError from './errors/PostChainspaceTransactionError';
import Transaction from './Transaction';

class ChainspaceClient {
  constructor(host) {
    this.url = `${host}/api/1.0`;
  }

  async fetchLastTransaction(contractId) {
    function byTimestamp(one, two) {
      const d1 = moment(one.timestamp);
      const d2 = moment(two.timestamp);

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
      return new Transaction(validTransactions[0].transactionJson);
    }
    throw new FetchChainspaceTransactionsError();
  }

  async postTransaction(transaction) {
    let response;
    try {
      response = await axios.post(`${this.url}/transaction/process`, transaction);
    } catch (error) {
      throw new UnexpectedChainspaceError();
    }
    if (response.status === 200) {
      return response;
    }
    throw new PostChainspaceTransactionError();
  }
}

export default ChainspaceClient;
