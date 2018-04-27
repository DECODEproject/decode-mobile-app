import types from '../actionTypes';

const initialState = {
  id: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_WALLET_ID:
      return {
        id: action.id,
      };
    default:
      return state;
  }
}
