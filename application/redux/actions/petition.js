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

import types from '../actionTypes';
import Signature from '../../../lib/Signature';

export function requestPetition() {
  return {
    type: types.PETITION_REQUESTED,
  };
}

export function setPetition(petition, walletAttributes) {
  return {
    type: types.SET_PETITION,
    petition,
    walletAttributes,
  };
}

export function setPetitionError(error) {
  return {
    type: types.SET_PETITION_ERROR,
    error,
  };
}

export function signPetitionAction() {
  return {
    type: types.SIGN_PETITION,
  };
}

export function signPetitionError(error) {
  return {
    type: types.SIGN_PETITION_ERROR,
    error,
  };
}

export function toggleEnableAttribute(attribute) {
  return dispatch => dispatch({
    type: types.TOGGLE_ENABLE_ATTRIBUTE,
    attribute,
  });
}

export function getPetition(decidimClient, petitionId) {
  return async (dispatch, getState) => {
    try {
      const { petition: petitionResult } = await decidimClient.fetchPetition(petitionId);
      const { attributes } = getState();
      const currentAttributes = attributes ? attributes.list : new Map();
      return dispatch(setPetition(petitionResult, currentAttributes));
    } catch (error) {
      return dispatch(setPetitionError(error.message));
    }
  };
}

async function signPetitionZenroom(dispatch, chainspaceClient, contractId, zenroomContract, signature, vote) { //eslint-disable-line
  try {
    if (vote == 'No') return dispatch(signPetitionError('This is a test error'));
    // console.log(`Going to call chainspace client fetchLastTransaction for contractId ${contractId}`);
    // const lastTx = await chainspaceClient.fetchLastTransaction(contractId);
    // console.log(`LastTx contract id: ${lastTx ? lastTx.tx.contractID : "none" }`);
    // const zenroomOutput = await zenroomContract.addSignature(signature, lastTx.outputs);
    // console.log(`Z output: ${JSON.stringify(zenroomOutput)}`);
    // const transaction = zenroomContract.buildTransaction(zenroomOutput, lastTx);
    //
    // await chainspaceClient.postTransaction(transaction);
  } catch (error) {
    console.log('errooooooooooor', error);
    return dispatch(signPetitionError(error.message));
  }

  return dispatch(signPetitionAction());
}

export function signPetition(vote, age, gender, district, chainspaceClient, zenroomContract) { //eslint-disable-line
  return async (dispatch, getState) => {
    const contractId = 'zenroom_petition';
    const signature = new Signature(vote, gender, age, district);
    return signPetitionZenroom(dispatch, chainspaceClient, contractId, zenroomContract, signature, vote);
  };
}
