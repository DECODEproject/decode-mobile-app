import types from '../actionTypes';

export function setPetition(petition) {
  return {
    type: types.SET_PETITION,
    petition,
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

export function getPetition(petitionLink) {
  return dispatch =>
    fetch(petitionLink).then(async (response) => {
      if (!response.ok) {
        dispatch(setPetitionError(response.statusText));
      } else {
        const json = await response.json();
        dispatch(setPetition(json));
      }
    });
}

export function signPetition(petition, walletId, walletProxyLink, vote) {
  const request = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      signatory: walletId.substring(0, 5),
      isEthereum: petition.isEthereum,
      vote,
    }),
  };

  return dispatch =>
    fetch(`${walletProxyLink}/sign/petitions/${petition.id}`, request)
      .then(async (response) => {
        if (!response.ok) {
          dispatch(signPetitionError(response.statusText));
        } else {
          dispatch(signPetitionAction());
        }
      });
}

