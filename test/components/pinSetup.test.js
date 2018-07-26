import React from 'react';
import { TextInput } from 'react-native';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16/build/index';
import types from '../../application/redux/actionTypes';
import PinSetup from '../../screens/PinSetup';
import Button from '../../application/components/Button/Button';


Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk]);

describe('PinSetup screen', () => {
  const initialState = {
    pinSetup: {
      pin1: '',
      pin2: '',
      validated: false,
    },
  };

  const initialStateWithPins = {
    pinSetup: {
      pin1: '1234',
      pin2: '1234',
      validated: true,
    },
  };

  describe('UI tests', () => {
    it('should have a two of text inputs', () => {
      const store = mockStore(initialState);
      const wrapper = shallow(
        <PinSetup />,
        { context: { store } },
      );

      expect(wrapper.dive().find(TextInput)).toHaveLength(2);
    });

    it('should have a button', () => {
      const store = mockStore(initialState);
      const wrapper = shallow(
        <PinSetup />,
        { context: { store } },
      );

      expect(wrapper.dive().find(Button)).toHaveLength(1);
    });

    it('should disable the save button if the state is not valid', () => {
      const store = mockStore(initialState);
      const wrapper = shallow(
        <PinSetup />,
        { context: { store } },
      );

      const save = wrapper.dive().find(Button);

      expect(save.prop('enabled')).toBe(false);
    });
  });

  describe('Redux state tests', () => {
    it('should have empty value on initialized', () => {
      const store = mockStore(initialState);

      const wrapper = shallow(
        <PinSetup />,
        { context: { store } },
      );

      const valueInput1 = wrapper.dive().find(TextInput).at(0).prop('value');
      const valueInput2 = wrapper.dive().find(TextInput).at(1).prop('value');

      expect(valueInput1).toEqual('');
      expect(valueInput2).toEqual('');
    });

    it('should send an action when text changes on pin1', () => {
      const expectedAction = {
        type: types.PIN_SETUP_TEXT1_CHANGED,
        pin: '1234',
      };

      const store = mockStore(initialState);

      const wrapper = shallow(
        <PinSetup />,
        { context: { store } },
      );

      const pin1 = wrapper.dive().find(TextInput).at(0);
      pin1.simulate('changeText', '1234');

      expect(store.getActions()).toEqual([expectedAction]);
    });

    it('should send an action when text changes on pin2', () => {
      const expectedAction = {
        type: types.PIN_SETUP_TEXT2_CHANGED,
        pin: '1234',
      };

      const store = mockStore(initialState);

      const wrapper = shallow(
        <PinSetup />,
        { context: { store } },
      );

      const pin2 = wrapper.dive().find(TextInput).at(1);
      pin2.simulate('changeText', '1234');

      expect(store.getActions()).toEqual([expectedAction]);
    });

    it('should have the same values in the state and in the component', () => {
      const store = mockStore(initialStateWithPins);

      const wrapper = shallow(
        <PinSetup />,
        { context: { store } },
      );

      const valueInput1 = wrapper.dive().find(TextInput).at(0).prop('value');
      const valueInput2 = wrapper.dive().find(TextInput).at(1).prop('value');

      expect(valueInput1).toEqual('1234');
      expect(valueInput2).toEqual('1234');
    });


    it('should be an action after pressing save', (done) => {
      const expectedAction = {
        type: types.PIN_SETUP_STORE,
        pin: '1234',
      };

      const store = mockStore(initialStateWithPins);

      const wrapper = shallow(
        <PinSetup />,
        { context: { store } },
      );

      const button = wrapper.dive().find(Button);
      button.simulate('press');

      setImmediate(() => {
        expect(store.getActions()).toEqual([expectedAction]);
        done();
      });
    });
  });
});
