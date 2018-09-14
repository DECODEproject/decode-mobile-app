import axios from 'axios';
import ChainspaceClient from '../../lib/ChainspaceClient';

jest.mock('axios');

describe('Chainspace Client', () => {
  const chainspaceUrl = 'http://chainspace.io/api/1.0';
  const chainspaceClient = new ChainspaceClient(chainspaceUrl);
  const contractId = 'good_contract_id';


  const tx1 = { transactionJson: { contractID: 'good_contract_id' }, timestamp: '2018-01-01 00:00:00.000', outputs: ['1'] };
  const tx2 = { transactionJson: { contractID: 'last_contract_id' }, timestamp: '2018-01-03 00:00:00.000', outputs: ['2'] };
  const tx3 = { transactionJson: { contractID: 'good_contract_id' }, timestamp: '2018-01-02 00:00:00.000', outputs: ['3'] };


  describe('fetchObjectsOfLastTransaction', () => {
    it('should return undefined when there are no transactions', () => {
      axios.get.mockResolvedValue({ data: [] });

      return chainspaceClient.fetchObjectsOfLastTransaction(contractId).then((response) => {
        expect(axios.get).toBeCalledWith(`${chainspaceUrl}/transactions`);
        expect(response).toEqual(undefined);
      });
    });

    it('should return the output of the only transaction, if there is only one transaction', () => {
      axios.get.mockResolvedValue({ data: [tx1] });

      return chainspaceClient.fetchObjectsOfLastTransaction(contractId).then((response) => {
        expect(axios.get).toBeCalledWith(`${chainspaceUrl}/transactions`);
        expect(response).toEqual(tx1.outputs);
      });
    });

    it('should return the output of the last transaction with correct contractID', () => {
      axios.get.mockResolvedValue({ data: [tx1, tx2, tx3] });

      return chainspaceClient.fetchObjectsOfLastTransaction(contractId).then((response) => {
        expect(axios.get).toBeCalledWith(`${chainspaceUrl}/transactions`);
        expect(response).toEqual(tx3.outputs);
      });
    });

    it('should return undefined if no transaction has this contractID', () => {
      axios.get.mockResolvedValue({ data: [tx1, tx2, tx3] });

      return chainspaceClient.fetchObjectsOfLastTransaction('NonExistentContractId').then((response) => {
        expect(axios.get).toBeCalledWith(`${chainspaceUrl}/transactions`);
        expect(response).toEqual(undefined);
      });
    });

    xit('should return an error if there is an error getting the transactions from Chainspace', async () => {

    });

    xit('should return an error if there is some problem calling the Chainspace API', () => {

    });
  });
});
