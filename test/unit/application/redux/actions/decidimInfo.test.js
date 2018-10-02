import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as urlModule from '../../../../../application/utils/url';
import setDecidimInfo from '../../../../../application/redux/actions/decidimInfo';

describe('setDecidimInfo', () => {
  it('should dispatch SET_DECIDIM_INFO action', async () => {
    const mockStore = configureMockStore([thunk]);
    const decidimAPIUrl = 'decidim.api.com';
    const petitionId = '40';
    const initialUrl = `decidim.com?decidimAPIUrl=${decidimAPIUrl}&petitionId=${petitionId}`;
    urlModule.default = jest.fn().mockReturnValue(Promise.resolve(initialUrl));

    const store = mockStore({
      decidimInfo: {
        decidimAPIUrl: undefined,
      },
    });
    const expectedActions = [{
      type: 'SET_DECIDIM_INFO',
      decidimAPIUrl,
      petitionId,
    }];

    await store.dispatch(setDecidimInfo());

    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
  });
});
