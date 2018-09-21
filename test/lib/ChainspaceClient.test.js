import axios from 'axios';
import ChainspaceClient from '../../lib/ChainspaceClient';
import FetchChainspaceTransactionsError from '../../lib/errors/FetchChainspaceTransactionsError';
import UnexpectedChainspaceError from '../../lib/errors/UnexpectedChainspaceError';
import Transaction from '../../lib/Transaction';
import PostChainspaceTransactionError from '../../lib/errors/PostChainspaceTransactionError';

jest.mock('axios');

describe('Chainspace Client', () => {
  const chainspaceHost = 'http://chainspace.io';
  const chainspaceClient = new ChainspaceClient(chainspaceHost);
  const contractId = 'good_contract_id';


  const tx1 = { transactionJson: { contractID: 'good_contract_id', outputs: ['1'] }, timestamp: '2018-09-21 09:10:03.896' };
  const tx2 = { transactionJson: { contractID: 'last_contract_id', outputs: ['2'] }, timestamp: '2018-01-03 00:00:00.000' };
  const tx3 = { transactionJson: { contractID: 'good_contract_id', outputs: ['3'] }, timestamp: '2018-09-21 09:10:05.574' };


  describe('fetchObjectsOfLastTransaction', () => {
    it('should return undefined when there are no transactions', () => {
      axios.get.mockResolvedValue({ status: 200, data: [] });

      return chainspaceClient.fetchObjectsOfLastTransaction(contractId).then((response) => {
        expect(axios.get).toBeCalledWith(`${chainspaceHost}/api/1.0/transactions`);
        expect(response).toEqual(undefined);
      });
    });

    it('should return the output of the only transaction, if there is only one transaction', () => {
      axios.get.mockResolvedValue({ status: 200, data: [tx1] });

      return chainspaceClient.fetchObjectsOfLastTransaction(contractId).then((response) => {
        expect(axios.get).toBeCalledWith(`${chainspaceHost}/api/1.0/transactions`);
        expect(response).toEqual(tx1.transactionJson.outputs);
      });
    });

    it('should return the output of the last transaction with correct contractID', () => {
      axios.get.mockResolvedValue({ status: 200, data: [tx1, tx2, tx3] });

      return chainspaceClient.fetchObjectsOfLastTransaction(contractId).then((response) => {
        expect(axios.get).toBeCalledWith(`${chainspaceHost}/api/1.0/transactions`);
        expect(response).toEqual(tx3.transactionJson.outputs);
      });
    });

    it('should return undefined if no transaction has this contractID', () => {
      axios.get.mockResolvedValue({ status: 200, data: [tx1, tx2, tx3] });

      return chainspaceClient.fetchObjectsOfLastTransaction('NonExistentContractId').then((response) => {
        expect(axios.get).toBeCalledWith(`${chainspaceHost}/api/1.0/transactions`);
        expect(response).toEqual(undefined);
      });
    });

    it('should return an error if there is an error getting the transactions from Chainspace', async () => {
      axios.get.mockResolvedValue({ status: 500 });

      await expect(chainspaceClient.fetchObjectsOfLastTransaction(contractId))
        .rejects.toThrow(new FetchChainspaceTransactionsError());
      expect(axios.get).toBeCalledWith(`${chainspaceHost}/api/1.0/transactions`);
    });

    it('should return an error if there is some problem calling the Chainspace API', async () => {
      axios.get.mockRejectedValue(new Error('Failed GET'));

      await expect(chainspaceClient.fetchObjectsOfLastTransaction(contractId))
        .rejects.toThrow(new UnexpectedChainspaceError());
      expect(axios.get).toBeCalledWith(`${chainspaceHost}/api/1.0/transactions`);
    });
  });

  describe('postTransaction', () => {
    const expectedTransaction = new Transaction({});
    it('should call post to correct url with correct transaction', () => {
      axios.post.mockResolvedValue({ status: 200 });

      return chainspaceClient.postTransaction(expectedTransaction).then(() => {
        expect(axios.post).toBeCalledWith(`${chainspaceHost}/api/1.0/transaction/process`, expectedTransaction);
      });
    });

    it('should return an error if there is an error posting transaction to Chainspace', async () => {
      axios.post.mockResolvedValue({ status: 500 });

      await expect(chainspaceClient.postTransaction(expectedTransaction))
        .rejects.toThrow(new PostChainspaceTransactionError());
      expect(axios.post).toBeCalledWith(`${chainspaceHost}/api/1.0/transaction/process`, expectedTransaction);
    });

    it('should throw error if there is some problem calling the Chainspace API', async () => {
      axios.post.mockRejectedValue(new Error('Failed POST'));

      await expect(chainspaceClient.postTransaction(expectedTransaction))
        .rejects.toThrow(new UnexpectedChainspaceError());
      expect(axios.post).toBeCalledWith(`${chainspaceHost}/api/1.0/transaction/process`, expectedTransaction);
    });
  });
});
