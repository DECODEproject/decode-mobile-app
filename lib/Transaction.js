class Transaction {
  constructor(transactionJSON) {
    this.outputs = transactionJSON.outputs;
  }
}

export default Transaction;
