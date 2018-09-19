import contract from '../assets/contracts/vote';


class ZenroomContract {
  constructor(zenroomExecutor) {
    this.zenroomExecutor = zenroomExecutor;
  }

  async addSignature(signature, currentOutputs) {
    const lastOutput = currentOutputs[currentOutputs.length - 1];
    const json = JSON.parse(lastOutput);
    json.option = signature;

    return this.zenroomExecutor.execute(contract, json);
  }
}

export default ZenroomContract;
