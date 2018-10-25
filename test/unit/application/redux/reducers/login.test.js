import reducer from '../../../../../application/redux/reducers/login';
import types from '../../../../../application/redux/actionTypes';
import Attribute from '../../../../../lib/Attribute';

describe('login reducer', () => {
  const defaultState = {
    credentials: [],
    isComingFromLogin: false,
  };
  it('should have default state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should change isComingFromLogin to true', () => {
    const action = {
      type: types.COMING_FROM_LOGIN,
    };

    expect(reducer(defaultState, action)).toEqual({
      credentials: [],
      isComingFromLogin: true,
    });
  });

  it('should set isComingFromLogin to false', () => {
    const initialState = {
      credentials: [],
      isComingFromLogin: true,
    };

    const action = {
      type: types.NOT_COMING_FROM_LOGIN,
    };

    expect(reducer(initialState, action)).toEqual({
      credentials: [],
      isComingFromLogin: false,
    });
  });

  it('should set the new credentials', () => {
    const mockedMakingSenseCredential = new Attribute({
      predicate: 'schema:iotCommunity', object: 'MakingSense', scope: '', provenance: { url: 'https://making-sense.eu/credential-issuer' },
    }, '6c347975ca6aac24b46d9749808ae5392816ac23988e5dc46df4b85c0a', '');

    const action = {
      type: types.SET_CREDENTIALS,
      credentials: [mockedMakingSenseCredential],
    };

    expect(reducer(defaultState, action)).toEqual({
      credentials: [mockedMakingSenseCredential],
      isComingFromLogin: false,
    });
  });
});
