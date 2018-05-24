import reducer from '../../../../../application/redux/reducers/petitionLink';
import types from '../../../../../application/redux/actionTypes';

describe('petitionLink reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      petitionLink: undefined,
    });
  });

  it('should handle SET_PETITION_LINK', () => {
    const somePetitionLink = 'someLink.com';
    const initialPetition = { type: types.SET_PETITION_LINK, petitionLink: somePetitionLink };

    expect(reducer(undefined, initialPetition)).toEqual({
      petitionLink: somePetitionLink,
    });
  });
});
