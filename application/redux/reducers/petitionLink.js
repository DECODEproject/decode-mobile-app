const initialState = {
  petitionLink: undefined,
};


export default function reducer (state = initialState, action) {
  switch(action.type) {
    case 'SET_PETITION_LINK':
      return {
        petitionLink: action.petitionLink,
      };
    default:
      return state;
  }
}