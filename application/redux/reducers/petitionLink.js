const initialState = {
  petitionLink: undefined,
};

export const SET_PETITION_LINK = 'SET_PETITION_LINK';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PETITION_LINK:
      return {
        petitionLink: action.petitionLink,
      };
    default:
      return state;
  }
}
