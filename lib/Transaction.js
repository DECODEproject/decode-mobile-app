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

import sha256 from 'js-sha256';

class Transaction {
  constructor(transactionJSON, store) {
    this.outputs = transactionJSON.outputs;
    this.extraParameters = transactionJSON.extra_parameters;
    this.tx = transactionJSON;
    this.store = store;
  }

  calculateObjectId(idx) {
    const jsonTx = JSON.stringify(this.tx, Object.keys(this.tx).sort());
    const txDigest = sha256(jsonTx);

    const object = this.outputs[idx];
    const objectDigest = sha256(object);

    const objectId = `${txDigest}|${objectDigest}|${idx}`;
    return sha256(objectId);
  }

  chainspaceJson() {
    const json = {
      transaction: this.tx,
    };

    if (this.store) {
      json.store = this.store;
    }

    return json;
  }
}

export default Transaction;
