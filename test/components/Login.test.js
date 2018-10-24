import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import Login, { EmptyLogin } from '../../screens/Login';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('Login Screen', () => {
  it('should display a text when there is no credential available', () => {
    const store = mockStore({
      credentials: [],
      isComingFromLogin: false,
    });

    const wrapper = shallow(<Login />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();


    const emptyStateText = wrapper.find(EmptyLogin);
    expect(emptyStateText).toHaveLength(1);
  });
});
