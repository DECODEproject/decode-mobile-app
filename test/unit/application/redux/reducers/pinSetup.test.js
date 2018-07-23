import pinSetupReducer from '../../../../../application/redux/reducers/pinSetup';
import types from '../../../../../application/redux/actionTypes';

describe('PinSetup screen', () => {
  const initialState = {
    pinSetup: {
      pin1: '',
      pin2: '',
      validated: false,
    },
  };

  it('should have initial state', () => {
    expect(pinSetupReducer(undefined, {})).toEqual(initialState.pinSetup);
  });

  it('should handle PIN_SETUP_TEXT1_CHANGED action with reducer', () => {
    expect(pinSetupReducer([], {
      type: types.PIN_SETUP_TEXT1_CHANGED,
      pin: '1234',
    })).toEqual({
      pin1: '1234',
      validated: false,
    });
  });

  it('should handle PIN_SETUP_TEXT2_CHANGED action with reducer', () => {
    expect(pinSetupReducer([], {
      type: types.PIN_SETUP_TEXT2_CHANGED,
      pin: '5678',
    })).toEqual({
      pin2: '5678',
      validated: false,
    });
  });
});
