/*
 * DECODE App – A mobile app to control your personal data
 * Copyright (C) 2019 – Thoughtworks Ltd.
 * Copyright (C) 2019 – DRIBIA Data Research S.L.
 *
 * DECODE App is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DECODE App is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * email: ula@dribia.com
 */

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
