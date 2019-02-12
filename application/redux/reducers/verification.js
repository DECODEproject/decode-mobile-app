import types from '../actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_VERIFICATION_INPUT:
      return {
        ...state,
        [action.id]: action.value,
      };
    default:
      return state;
  }
};
