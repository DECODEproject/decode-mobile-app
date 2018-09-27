import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { deleteWalletData } from '../../../../../application/redux/actions/wallet';

const mockStore = configureStore([thunk]);

describe('deleteWalletData', () => {
  it('should delete "attributes" and "pincode" from the local store', () => {
    const store = mockStore();
    const deleteItemAsyncMock = jest.fn();

    store.dispatch(deleteWalletData(deleteItemAsyncMock));

    expect(deleteItemAsyncMock).toBeCalledWith('pincode');
    expect(deleteItemAsyncMock).toBeCalledWith('attributes');
  });
});
