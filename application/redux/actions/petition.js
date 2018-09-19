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

async function getPetitionFromDecidimMock(dispatch, getState, petitionLink) {
  let response;
  try {
    response = await fetch(petitionLink);
  } catch (error) {
    return dispatch(setPetitionError('Could not retrieve petition details.'));
  }

  if (!response.ok) {
    let text = await response.text();
    if (!text) text = 'Unknown error';
    return dispatch(setPetitionError(text));
  }
  const json = await response.json();
  const { attributes } = getState();
  const currentAttributes = attributes ? attributes.list : new Map();
  return dispatch(setPetition(json, currentAttributes));
}

async function getPetitionFromDecidim(dispatch, getState, client, decidimAPIUrl, petitionId) {
  try {
    const { petition: petitionResult } = await client.fetchPetition(petitionId);
    const { attributes } = getState();
    const currentAttributes = attributes ? attributes.list : new Map();
    return dispatch(setPetition(petitionResult, currentAttributes));
  } catch (error) {
    return dispatch(setPetitionError(error.message));
  }
}

export function getPetition(decidimClient, petitionLink, decidimAPIUrl, petitionId) {
  return async (dispatch, getState) => {
    if (!getState().featureToggles.decidimApi) {
      return getPetitionFromDecidimMock(dispatch, getState, petitionLink);
    }
    return getPetitionFromDecidim(dispatch, getState, decidimClient, decidimAPIUrl, petitionId);
  };
}


async function signViaProxy(dispatch, petition, walletId, walletProxyLink, vote, age, gender) {
  const request = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      signatory: walletId.substring(0, 5),
      vote,
      age,
      gender,
    }),
  };

  const response = await fetch(`${walletProxyLink}/sign/petitions/${petition.id}`, request);
  const responseJson = await response.json();
  if (!response.ok) {
    return dispatch(signPetitionError(responseJson.error));
  }
  return dispatch(signPetitionAction());
}

async function signPetitionZenroom(dispatch, chainspaceClient, contractId, zenroomContract, signature) { //eslint-disable-line
  try {
    const lastOutputs = await chainspaceClient.fetchObjectsOfLastTransaction(contractId);

    const transaction = zenroomContract.addSignature(signature, lastOutputs);
    await chainspaceClient.postTransaction(transaction);
  } catch (error) {
    return dispatch(signPetitionError(error.message));
  }

  return dispatch(signPetitionAction());
}

export function signPetition(petition, walletId, walletProxyLink, vote, age, gender, chainspaceClient, zenroomContract) { //eslint-disable-line
  return async (dispatch, getState) => {
    if (!getState().featureToggles.zenroom) {
      return signViaProxy(dispatch, petition, walletId, walletProxyLink, vote, age, gender);
    }
    const contractId = 'zenroom_petition';
    const signature = new Signature(vote, gender, age);
    return signPetitionZenroom(dispatch, chainspaceClient, contractId, zenroomContract, signature);
  };
}
