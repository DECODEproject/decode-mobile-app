import reducer from '../../../../../application/redux/reducers/decidimInfo';
import types from '../../../../../application/redux/actionTypes';

describe('decidimInfo reducer', () => {
  const someInitialState = {
    decidimAPIUrl: 'someOldDecidimApiUrl',
    petitionId: '1',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      decidimAPIUrl: undefined,
      petitionId: undefined,
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
