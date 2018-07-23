import React from 'react';
import { TextInput } from 'react-native';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16/build/index';
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

    it('should have the same values in the state and in the component', () => {
      const altInitialState = {
        pinSetup: {
          pin1: '1234',
          pin2: '1234',
          validated: false,
        },
      };

      const store = mockStore(altInitialState);

      const wrapper = shallow(
        <PinSetup />,
        { context: { store } },
      );

      const valueInput1 = wrapper.dive().find(TextInput).at(0).prop('value');
      const valueInput2 = wrapper.dive().find(TextInput).at(1).prop('value');

      expect(valueInput1).toEqual('1234');
      expect(valueInput2).toEqual('1234');
    });
  });
});
