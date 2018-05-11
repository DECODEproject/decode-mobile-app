import types from '../actionTypes';

export function signOutcomeAction(signSuccess) {
  return {
    type: types.SIGN_OUTCOME,
    signSuccess,
  };
}

export function setSignOutcome(signSuccess) {
  return async dispatch => dispatch(signOutcomeAction(signSuccess));
}
