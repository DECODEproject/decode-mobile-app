const initialState = {
  loaded: false,
  petition: {
  },
  error: undefined,
};

export const SET_PETITION = 'SET_PETITION';
export const SET_PETITION_ERROR = 'SET_PETITION_ERROR';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PETITION:
      return {
        loaded: true,
        petition: action.petition,
        error: undefined,
      };
    case SET_PETITION_ERROR:
      return {
        loaded: false,
        petition: {},
        error: action.error,
      };
    default:
      return state;
  }
}
