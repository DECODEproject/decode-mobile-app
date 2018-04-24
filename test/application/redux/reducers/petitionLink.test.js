import reducer, { SET_PETITION_LINK } from '../../../../application/redux/reducers/petitionLink';

describe('petitionLink reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      petitionLink: undefined,
    });
  });

  it('should handle SET_PETITION_LINK', () => {
    const somePetitionLink = 'someLink.com';
    const initialPetition = { type: SET_PETITION_LINK, petitionLink: somePetitionLink };

    expect(reducer(undefined, initialPetition)).toEqual({
      petitionLink: somePetitionLink,
    });
  });
});
