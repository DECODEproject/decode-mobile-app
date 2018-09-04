import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as urlModule from '../../../../../application/utils/url';
import { onStartApp, setDecidimInfo } from '../../../../../application/redux/actions/decidimInfo';

describe('onStartApp', () => {
  it('should dispatch SET_PETITION_LINK action', async () => {
    const mockStore = configureMockStore([thunk]);
    const petitionLink = 'some.link.com';
    const initialUrl = `decidim.com?petitionLink=${petitionLink}`;
    urlModule.default = jest.fn().mockReturnValue(Promise.resolve(initialUrl));

    const store = mockStore({
      decidimInfo: {
        petitionLink: undefined,
      },
    });
    const expectedActions = [{
      type: 'SET_PETITION_LINK',
      petitionLink,
    }];

    await store.dispatch(onStartApp());

    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
  });

  it('should dispatch SET_DECIDIM_INFO action', async () => {
    const mockStore = configureMockStore([thunk]);
    const decidimAPIUrl = 'decidim.api.com';
    const petitionId = '40';
    const initialUrl = `decidim.com?petitionLink=${'some.link.com'}&decidimAPIUrl=${decidimAPIUrl}&petitionId=${petitionId}`;
    urlModule.default = jest.fn().mockReturnValue(Promise.resolve(initialUrl));

    const store = mockStore({
      decidimInfo: {
        petitionLink: undefined,
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
