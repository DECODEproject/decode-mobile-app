import contract from '../assets/contracts/vote';
import ZenroomExecutorError from './errors/ZenroomExecutorError';
import Transaction from './Transaction';


class ZenroomContract {
  constructor(zenroomExecutor) {
    this.zenroomExecutor = zenroomExecutor;
  }

  async addSignature(signature, currentOutputs) {
    const lastOutput = currentOutputs[currentOutputs.length - 1];
    const zenroomData = {
      ...JSON.parse(lastOutput),
      option: signature.representation(),
    };

    let x;
    try {
      x = await this.zenroomExecutor.execute(contract, zenroomData);
    } catch (error) {
      console.log('ZC', error);
      throw new ZenroomExecutorError();
    }

    return x;
    // build the transaction
  }

  buildTransaction(zenroomOutput, lastTx) { //eslint-disable-line
    const zenroomJson = JSON.parse(zenroomOutput);

    const lastOutputIndex = lastTx.outputs.length - 1;
    const lastOutputObjectId = lastTx.calculateObjectId(lastOutputIndex);

    const outputs = {
      public: zenroomJson.public,
      options: zenroomJson.options,
      scores: zenroomJson.scores,
      type: 'PetitionEncObject',
    };

    const txJson = {
      outputs: [JSON.stringify(outputs)],
      parameters: [JSON.stringify(zenroomJson.increment),
        JSON.stringify(zenroomJson.provebin),
        JSON.stringify(zenroomJson.prove_sum_one)],
      inputIDs: [lastOutputObjectId],
      methodID: 'add_signature',
      returns: [],
      dependencies: [],
      referenceInputIDs: [],
      contractID: 'zenroom_petition',
    };

    const store = { };
    store[lastOutputObjectId] = lastTx.outputs[lastOutputIndex];

    return new Transaction(txJson, store);
  }
}

export default ZenroomContract;
