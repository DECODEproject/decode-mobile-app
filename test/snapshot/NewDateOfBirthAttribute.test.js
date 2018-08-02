import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import NewDateOfBirthAttribute from '../../screens/NewDateOfBirthAttribute';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

const initialState = {
  navigation: {},
  wallet: {
    id: '123',
  },
};

it('renders NewDateOfBirthAttribute component', () => {
  const wrapper = shallow(
    <NewDateOfBirthAttribute />,
    { context: { store: mockStore(initialState) } },
  );
  expect(wrapper.dive()).toMatchSnapshot();
});
