import contract from '../assets/contracts/vote';


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

    const x = this.zenroomExecutor.execute(contract, zenroomData).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });


    return x;
    // build the transaction
  }
}

export default ZenroomContract;
