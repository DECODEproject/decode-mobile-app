import { AsyncStorage } from 'react-native';

export const getWalletID = async () => {
  let result;
  try {
    result = await AsyncStorage.getItem('@MyStore:id');
  } catch (e) {
    console.error(e);
  }
  return result;
};

function generateWalletId() {
  return '42';
}

export const initialiseWalletID = async () => {
  const id = await getWalletID();
  if (!id) {
    try {
      await AsyncStorage.setItem('@MyStore:id', generateWalletId());
    } catch (e) {
      console.error(e);
    }
  }
};


export const storePinInPhone = async (setItem, pin) => {
  setItem('pincode', pin);
};

export const retrievePin = async getItem => getItem('pincode');
