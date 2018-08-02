import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16/build/index';
import configureStore from 'redux-mock-store';
import Button from '../../application/components/Button/Button';
import NewDateOfBirthAttribute from '../../screens/NewDateOfBirthAttribute';
import types from '../../application/redux/actionTypes';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('NewDateOfBirthAttribute', () => {
  describe('save date of birth', () => {
    it('should dispatch saveDateOfBirth action', () => {
      const expectedAction = {
        type: types.SAVE_DATE_OF_BIRTH,
        dateOfBirth: '01/01/1990',
      };

      const initialState = {
        navigation: {
          currentNavigatorUID: 2,
        },
        wallet: {
          id: '123',
        },
      };
      const store = mockStore(initialState);
      const wrapper = shallow(
        <NewDateOfBirthAttribute />,
        { context: { store } },
      );

      const saveDateOfBirth = wrapper.dive().find(Button);

      saveDateOfBirth.props().onPress();

      const lastAction = store.getActions()[store.getActions().length - 1];
      expect(lastAction).toEqual(expectedAction);
    });
  });
});
