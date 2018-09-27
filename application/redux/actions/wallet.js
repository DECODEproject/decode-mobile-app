import { getWalletID } from '../../../LocalStorage';

export function setWalletId(id) {
  return {
    type: 'SET_WALLET_ID',
    id,
  };
}

export function getWalletId() {
  return (dispatch) => {
    getWalletID().then((id) => { dispatch(setWalletId(id)); });
  };
}

export function deleteWalletData(deleteItemAsync, errorCallback, successCallback) {
  return async () => {
    try {
      await deleteItemAsync('pincode');
      await deleteItemAsync('attributes');
      successCallback();
    } catch (e) { //eslint-disable-line
      console.log('error deleting from wallet:');
      console.log(e);
      errorCallback();
    }
  };
}
