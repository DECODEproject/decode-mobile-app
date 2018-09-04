import reducer from '../../../../../application/redux/reducers/petitionLink';
import types from '../../../../../application/redux/actionTypes';

describe('petitionLink reducer', () => {
  const someInitialState = {
    petitionLink: 'someOldPetitionLink',
    decidimAPIUrl: 'someOldDecidimApiUrl',
    petitionId: '1',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      petitionLink: undefined,
      decidimAPIUrl: undefined,
      petitionId: undefined,
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

  it('should handle SET_DECIDIM_INFO', () => {
    const someApiUrl = 'someLink.com';
    const somePetitionId = '40';
    const initialPetition = {
      type: types.SET_DECIDIM_INFO,
      decidimAPIUrl: someApiUrl,
      petitionId: somePetitionId,
    };

    expect(reducer(someInitialState, initialPetition)).toEqual({
      ...someInitialState,
      decidimAPIUrl: someApiUrl,
      petitionId: somePetitionId,
    });
  });
});
