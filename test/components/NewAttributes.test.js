import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16/build/index';
import configureStore from 'redux-mock-store';
import NewAttributes from '../../screens/NewAttributes';
import Button from '../../application/components/Button/Button';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('NewAttributes', () => {
  describe('add date of birth', () => {
    it('should go to Add New Date of Birth screen', () => {
      const initialState = {
        navigation: {
          currentNavigatorUID: 2,
        },
      };
      const store = mockStore(initialState);
      const wrapper = shallow(
        <NewAttributes />,
        { context: { store } },
      );

      const addDateOfBirth = wrapper.dive().find(Button);

      addDateOfBirth.props().onPress();

      expect(store.getActions()[0].child.routeName).toEqual('newDateOfBirthAttribute');
    });
  });
});
