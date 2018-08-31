import reducer from '../../../../../application/redux/reducers/petitionLink';
import types from '../../../../../application/redux/actionTypes';

describe('petitionLink reducer', () => {
  const someInitialState = {
    petitionLink: 'someOldPetitionLink',
    decidimAPIUrl: 'someOldDecidimApiUrl',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      petitionLink: undefined,
      decidimAPIUrl: undefined,
    });
  });

  it('should handle SET_PETITION_LINK', () => {
    const somePetitionLink = 'someLink.com';
    const initialPetition = { type: types.SET_PETITION_LINK, petitionLink: somePetitionLink };

    expect(reducer(someInitialState, initialPetition)).toEqual({
      ...someInitialState,
      petitionLink: somePetitionLink,
    });
  });

  it('should handle SET_DECIDIM_API_URL', () => {
    const someApiUrl = 'someLink.com';
    const initialPetition = { type: types.SET_DECIDIM_API_URL, decidimAPIUrl: someApiUrl };

    expect(reducer(someInitialState, initialPetition)).toEqual({
      ...someInitialState,
      decidimAPIUrl: someApiUrl,
    });
  });
});
