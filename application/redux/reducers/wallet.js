const initialState = {
  id: '',
};

export const SET_WALLET_ID = 'SET_WALLET_ID';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_WALLET_ID:
      return {
        id: action.id,
      };
    default:
      return state;
  }
}
