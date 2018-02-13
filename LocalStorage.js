import uuidv1 from 'uuid';
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

export const initialiseWalletID = async () => {
  const id = await getWalletID();
  if (!id) {
    try {
      await AsyncStorage.setItem('@MyStore:id', uuidv1());
    } catch (e) {
      console.error(e);
    }
  }
};
