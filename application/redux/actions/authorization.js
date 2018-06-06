import types from '../actionTypes';

export default pin => ({
  type: types.AUTHORIZATION_ACTION,
  pinCorrect: pin === '1234',
});
