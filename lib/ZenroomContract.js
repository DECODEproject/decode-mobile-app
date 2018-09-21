import contract from '../assets/contracts/vote';
import ZenroomExecutorError from './errors/ZenroomExecutorError';


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
}

export default ZenroomContract;
