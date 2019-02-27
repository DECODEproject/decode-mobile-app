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

import axios from 'axios';
import moment from 'moment';
import FetchChainspaceTransactionsError from './errors/FetchChainspaceTransactionsError';
import UnexpectedChainspaceError from './errors/UnexpectedChainspaceError';
import PostChainspaceTransactionError from './errors/PostChainspaceTransactionError';
import Transaction from './Transaction';

class ChainspaceClient {
  constructor(host) {
    this.url = `${host}/api/1.0`;
  }

  async fetchLastTransaction(contractId) {
    function byTimestamp(one, two) {
      const d1 = moment(one.timestamp);
      const d2 = moment(two.timestamp);

      return d2 - d1;
    }

    function byContract(id) {
      return transaction => transaction.transactionJson.contractID === id;
    }

    let response;
    try {
      console.log(`${this.url}/transactions`);
      response = await axios.get(`${this.url}/transactions`);
    } catch (error) {
      console.log(`Error getting last transaction: ${JSON.stringify(error)}`);
      throw new UnexpectedChainspaceError();
    }
    if (response.status === 200) {
      const validTransactions = response.data.filter(byContract(contractId)).sort(byTimestamp);

      if (validTransactions.length === 0) {
        return undefined;
      }
      return new Transaction(validTransactions[0].transactionJson);
    }
    throw new FetchChainspaceTransactionsError();
  }

  async postTransaction(transaction) {
    let response;
    try {
      response = await axios.post(`${this.url}/transaction/process`, transaction.chainspaceJson());
    } catch (error) {
      console.log(`Error posting transaction: ${JSON.stringify(error)}`);
      throw new UnexpectedChainspaceError();
    }
    if (response.status === 200) {
      return response;
    }
    throw new PostChainspaceTransactionError();
  }
}

export default ChainspaceClient;
