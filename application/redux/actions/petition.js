import types from '../actionTypes';

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

async function getPetitionFromDecidimAPI(dispatch, getState, petitionLink, petitionId) {
  let response;
  try {
    const graphQlQuery = `${petitionLink}
        query={
          participatoryProcess(id: ${petitionId}) {
            id
            title {
              translation (locale: "ca")
            }
          }
        }
      `;
    response = await fetch(graphQlQuery);
  } catch (error) {
    return dispatch(setPetitionError('Could not retrieve petition details.'));
  }

  if (!response.ok) {
    let text = await response.text();
    if (!text) text = 'Unknown error';
    return dispatch(setPetitionError(text));
  }
  const { data } = await response.json();
  const petitionResult = {
    petition: {
      id: data.participatoryProcess.id,
      title: data.participatoryProcess.title.translation,
      attributes: {
        mandatory: [{
          predicate: 'schema:addressLocality',
          object: 'Barcelona',
          scope: 'can-access',
          credentialIssuer: {
            url: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
          },
        }],
        optional: [],
      },
    },
  };
  const { attributes } = getState();
  const currentAttributes = attributes ? attributes.list : new Map();
  return dispatch(setPetition(petitionResult, currentAttributes));
}

export function getPetition(petitionLink, petitionId) {
  return async (dispatch, getState) => {
    if (!getState().featureToggles.decidimApi) {
      return getPetitionFromDecidimMock(dispatch, getState, petitionLink);
    }
    return getPetitionFromDecidimAPI(dispatch, getState, petitionLink, petitionId);
  };
}

export function signPetition(petition, walletId, walletProxyLink, vote, age, gender) {
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

  return async (dispatch) => {
    const response = await fetch(`${walletProxyLink}/sign/petitions/${petition.id}`, request);
    const responseJson = await response.json();
    if (!response.ok) {
      return dispatch(signPetitionError(responseJson.error));
    }
    return dispatch(signPetitionAction());
  };
}
