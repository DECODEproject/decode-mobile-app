import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { deleteWalletData } from '../../../../../application/redux/actions/wallet';

const mockStore = configureStore([thunk]);

describe('deleteWalletData', () => {
  const errorCallback = jest.fn();
  const successCallback = jest.fn();

  it('should delete "attributes" and "pincode" from the local store', async () => {
    const store = mockStore();
    const deleteItemAsyncMock = jest.fn();

    await store.dispatch(deleteWalletData(deleteItemAsyncMock, errorCallback, successCallback));

    expect(deleteItemAsyncMock).toBeCalledWith('pincode');
    expect(deleteItemAsyncMock).toBeCalledWith('attributes');
  });

  it('should execute successful callback if delete is successful', async () => {
    const store = mockStore();
    const deleteItemAsyncMock = jest.fn();

    await store.dispatch(deleteWalletData(deleteItemAsyncMock, errorCallback, successCallback));

    expect(successCallback).toBeCalled();
  });

  it('should execute error callback if deleting an item fails', async () => {
    const store = mockStore();
    const deleteItemAsyncMock = jest.fn().mockRejectedValue(new Error('delete failed'));

    await store.dispatch(deleteWalletData(deleteItemAsyncMock, errorCallback, successCallback));

    expect(errorCallback).toBeCalled();
  });
});
