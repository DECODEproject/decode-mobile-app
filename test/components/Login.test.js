import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import { Text } from 'react-native';
import Login from '../../screens/Login';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('Login Screen', () => {
  it('should display a text when there is no credential available', () => {
    const store = mockStore({
      credentials: [],
    });

    const wrapper = shallow(<Login />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const emptyStateText = wrapper.find(Text).findWhere(element => element.text() === 'You have no credentials available');
    expect(emptyStateText).toHaveLength(1);
  });
});
