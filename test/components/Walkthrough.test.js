import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Walkthrough from '../../screens/Walkthrough';
import Button from '../../application/components/Button/Button';


Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('Walkthrough', () => {
  describe('go to next screen button', () => {
    const initialState = {
      navigation: {},
    };
    it('should navigate to pinSetup page', () => {
      const store = mockStore(initialState);

      const wrapper = shallow(
        <Walkthrough />,
        { context: { store } },
      );

      wrapper.dive().find(Button).simulate('press');
      expect(store.getActions()).toHaveLength(1);
      expect(store.getActions()[0].child.routeName).toEqual('pinSetup');
    });
  });
});
