import types from '../actionTypes';

export default async (pin, retrievePinFn) => {
  const storedPin = await retrievePinFn();

  return {
    type: types.AUTHORIZATION_ACTION,
    pinCorrect: pin === storedPin,
  };
};
