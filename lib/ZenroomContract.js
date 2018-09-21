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
      throw new ZenroomExecutorError();
    }

    return x;
    // build the transaction
  }

  buildTransaction(zenroomOutput) { //eslint-disable-line
    const zenroomJson = JSON.parse(zenroomOutput);

    const outputs = {
      public: zenroomJson.public,
      options: zenroomJson.options,
      scores: zenroomJson.scores,
      type: 'PetitionEncObject',
    };

    const txJson = {
      outputs: [JSON.stringify(outputs)],
      extra_parameters: [zenroomJson.increment, zenroomJson.provebin, zenroomJson.prove_sum_one],

    };

    return new Transaction(txJson);
  }
}

export default ZenroomContract;
