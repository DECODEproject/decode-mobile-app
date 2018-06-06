import types from '../actionTypes';

const initialState = {
  authorized: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHORIZATION_ACTION:
      return {
        authorized: action.correctPin,
      };
    default:
      return state;
  }
};
