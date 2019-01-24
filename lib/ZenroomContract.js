import contract from '../assets/contracts/vote';
import ZenroomExecutorError from './errors/ZenroomExecutorError';
import ZenroomExecutor from './ZenroomExecutor';
import Transaction from './Transaction';


class ZenroomContract {

  async addSignature(signature, currentOutputs) {
      console.log("In add signature");
    const lastOutput = currentOutputs[currentOutputs.length - 1];
    const zenroomData = {
      ...JSON.parse(lastOutput),
      option: signature.representation(),
    };

    let x;
    try {
      console.log("Going to execute contract");
      console.log(`Zenroom data length: ${JSON.stringify(zenroomData).length}`);
      x = await ZenroomExecutor.execute(contract, JSON.stringify(zenroomData), '');
      console.log("Contract executed, response length: ", x.length);
    } catch (error) {
      console.log('ZC', error);
      throw new ZenroomExecutorError();
    }
    if (!x) throw new ZenroomExecutorError();

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
