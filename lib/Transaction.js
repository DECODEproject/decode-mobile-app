import sha256 from 'js-sha256';

class Transaction {
  constructor(transactionJSON) {
    this.outputs = transactionJSON.outputs;
    this.extraParameters = transactionJSON.extra_parameters;
    this.tx = transactionJSON;
  }

  calculateObjectId(idx) {
    const jsonTx = JSON.stringify(this.tx, Object.keys(this.tx).sort());
    const txDigest = sha256(jsonTx);

    const object = this.outputs[idx];
    const objectDigest = sha256(object);

    const objectId = `${txDigest}|${objectDigest}|${idx}`;
    return sha256(objectId);
  }
}

export default Transaction;
