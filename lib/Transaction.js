class Transaction {
  constructor(transactionJSON) {
    this.outputs = transactionJSON.outputs;
    this.extraParameters = transactionJSON.extra_parameters;
  }
}

export default Transaction;
