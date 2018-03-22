import uuidv1 from 'uuid';
import { AsyncStorage } from 'react-native';

import CTX from 'milagro-crypto-js'

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
    var S0 = [];
    var W0 = [];

   var ctx2 = new CTX("NIST256");

  var rng = new ctx2.RAND();

    //S0 - private key
    //W0 - public key
   ctx2.ECDH.KEY_PAIR_GENERATE(rng, S0, W0);

  //  return W0;
    return ctx2.ECDH.bytestostring(W0);


}

export const initialiseWalletID = async () => {
  const id = await getWalletID();
  if (id) {
    try {

      await AsyncStorage.setItem('@MyStore:id', generateWalletId());
    } catch (e) {
      console.error(e);
    }
  }
};
