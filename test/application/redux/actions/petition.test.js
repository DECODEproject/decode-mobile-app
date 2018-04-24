import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import { getPetition } from '../../../../application/redux/actions/petition';
import { types } from '../../../../application/redux/actionTypes';

const mockStore = configureMockStore([thunk]);

describe('getPetition', () => {
  it('should dispatch successful action', () => {
    const petitionLink = 'petitions';
    const newPetition = {
      petition: {
        id: '2',
        isEthereum: 'true',
      },
    };
    const response = newPetition;

    const expectedActions = [{
      type: types.SET_PETITION,
      petition: newPetition,
    }];

    fetchMock.getOnce(petitionLink, response);
    const store = mockStore({
      petition: {
        petition: {
          id: '1234',
          isEthereum: 'false',
        },
      },
      wallet: {
        id: 'my-wallet-id-numbeeeeeeeeeeer',
      },
    });

    return store.dispatch(getPetition(petitionLink)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
