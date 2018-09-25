import Transaction from '../../lib/Transaction';

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
});
