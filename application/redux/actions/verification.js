import types from '../actionTypes';

export function updateVerificationInput(id, value) {
  return dispatch => dispatch({
    type: types.UPDATE_VERIFICATION_INPUT,
    id,
    value,
  });
}
