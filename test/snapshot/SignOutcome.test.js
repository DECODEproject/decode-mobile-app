import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import SignOutcome from '../../screens/SignOutcome';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

const initialState = {
  decidimInfo: {
    decidimAPIUrl: 'http://something.com',
  },
  signOutcome: {
    signSuccess: false,
  },
  petition: {
    petition: {},
    error: '',
  },
};

it('renders signOutcome component on successful sign', () => {
  const state = {
    ...initialState,
    signOutcome: {
      signSuccess: true,
    },
  };
  const wrapper = shallow(
    <SignOutcome />,
    { context: { store: mockStore(state) } },
  );
  expect(wrapper.dive()).toMatchSnapshot();
});

it('renders signOutcome component on unsuccessful sign', () => {
  const state = {
    ...initialState,
    signOutcome: {
      signSuccess: false,
    },
  };
  const wrapper = shallow(
    <SignOutcome />,
    { context: { store: mockStore(state) } },
  );
  expect(wrapper.dive()).toMatchSnapshot();
});
