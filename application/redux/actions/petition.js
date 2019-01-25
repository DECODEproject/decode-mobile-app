import types from '../actionTypes';
import Signature from '../../../lib/Signature';

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

async function signPetitionZenroom(dispatch, chainspaceClient, contractId, zenroomContract, signature) { //eslint-disable-line
  try {
    console.log(`Going to call chainspace client fetchLastTransaction for contractId ${contractId}`);
    const lastTx = await chainspaceClient.fetchLastTransaction(contractId);
    console.log(`LastTx contract id: ${lastTx ? lastTx.tx.contractID : "none" }`);

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
    return signPetitionZenroom(dispatch, chainspaceClient, contractId, zenroomContract, signature);
  };
}
