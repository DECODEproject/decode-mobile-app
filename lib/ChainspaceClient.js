import axios from 'axios';

class ChainspaceClient {
  constructor(url) {
    this.url = url;
  }

  fetchObjectsOfLastTransaction(contractId) {
    function byTimestamp(one, two) {
      const d1 = new Date(one.timestamp);
      const d2 = new Date(two.timestamp);

      return d2 - d1;
    }

    function byContract(id) {
      return transaction => transaction.transactionJson.contractID === id;
    }

    return axios.get(`${this.url}/transactions`).then((response) => {
      const validTransactions = response.data.filter(byContract(contractId)).sort(byTimestamp);

      if (validTransactions.length === 0) {
        return undefined;
      }
      return validTransactions[0].outputs;
    });
  }
}

export default ChainspaceClient;
