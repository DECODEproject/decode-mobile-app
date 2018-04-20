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
