export default class ZenroomExecutor {
  constructor() {
    this.zenroom_output = [];
  }

  outputAsString() {
    return this.zenroom_output.join('\n');
  }

  async execute(contract, data = {}, keys = {}, verbosity = 0) {
    return new Promise((resolve, reject) => {
      const zenroom = require('./zenroom')(); //eslint-disable-line

      zenroom.exec_ok = () => resolve(this.outputAsString());
      zenroom.exec_error = () => reject(new Error(this.outputAsString()));
      zenroom.print = (text) => { this.zenroom_output.push(text); };

      zenroom.ccall(
        'zenroom_exec', 'number',
        ['string', 'string', 'string', 'string', 'number'],
        [contract, null, JSON.stringify(keys), JSON.stringify(data), verbosity],
      );
    });
  }
}
