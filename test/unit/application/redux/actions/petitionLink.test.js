import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as urlModule from '../../../../../application/utils/url';
import { onStartApp, setDecidimAPIUrl } from '../../../../../application/redux/actions/petitionLink';

describe('onStartApp', () => {
  it('should dispatch SET_PETITION_LINK action', async () => {
    const mockStore = configureMockStore([thunk]);
    const petitionLink = 'some.link.com';
    const initialUrl = `decidim.com?petitionLink=${petitionLink}`;
    urlModule.default = jest.fn().mockReturnValue(Promise.resolve(initialUrl));

    const store = mockStore({
      petitionLink: {
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

  it('should dispatch SET_DECIDIM_API_URL action', async () => {
    const mockStore = configureMockStore([thunk]);
    const decidimAPIUrl = 'decidim.api.com';
    const initialUrl = `decidim.com?petitionLink=${'some.link.com'}&decidimAPIUrl=${decidimAPIUrl}`;
    urlModule.default = jest.fn().mockReturnValue(Promise.resolve(initialUrl));

    const store = mockStore({
      petitionLink: {
        petitionLink: undefined,
      },
    });
    const expectedActions = [{
      type: 'SET_DECIDIM_API_URL',
      decidimAPIUrl,
    }];

    await store.dispatch(setDecidimAPIUrl());

    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
  });
});
