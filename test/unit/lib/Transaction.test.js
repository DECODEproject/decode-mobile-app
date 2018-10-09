import Transaction from '../../../lib/Transaction';

describe('Transaction', () => {
  describe('calculateObjectID', () => {
    const txInit = `
    {
        "inputIDs": [],
        "outputs": [
            "{\\"type\\": \\"PetitionEncToken\\"}"
        ],
        "contractID": "petition_encrypted",
        "referenceInputIDs": [],
        "methodID": "init",
        "returns": [],
        "parameters": [],
        "dependencies": []
    }
    `;

    it('should calculate a proper object id for a one object transaction', () => {
      const tx = new Transaction(JSON.parse(txInit));
      const objectId = tx.calculateObjectId(0);
      expect(objectId).toEqual('14cbbc56438cd1c2afcee61bbc0236f6c85d688b63c4fc4b18dd9197c87c0283');
    });
  });

  describe('chainspaceJson', () => {
    const somePublic = 'testPublic';
    const someOptions = 'testOptions';
    const someScores = 'testScores';
    const someIncrement = 'testIncrement';
    const someProveBin = 'someProveBin';
    const someProveOne = 'someProveOne';
    const objectId = 'ae0ec32c63d818fa77494ca6e594576b9df876bc1d0bd5a77d6d2e2b784cef36';

    const txJson = {
      outputs: [JSON.stringify({
        public: somePublic,
        options: someOptions,
        scores: someScores,
        type: 'PetitionEncObject',
      })],
      parameters: [someIncrement, someProveBin, someProveOne],
      contractID: 'zenroom_petition',
      dependencies: [],
      inputsIDs: [objectId],
      methodID: 'add_signature',
      returns: [],
      referenceInputIDs: [],
    };
    const lastTx = {
      outputs: ['something'],
    };


    it('should wrap the transaction into a "transaction" key', () => {
      const nextTx = new Transaction(txJson);

      expect(nextTx.chainspaceJson()).toEqual({
        transaction: txJson,
      });
    });

    it('should add a store, if one sent into the constructor', () => {
      const store = {};
      const lastOutput = lastTx.outputs[0];
      store[objectId] = lastOutput;
      const nextTx = new Transaction(txJson, store);

      expect(nextTx.chainspaceJson()).toEqual({
        transaction: txJson,
        store,
      });
    });
  });
});
