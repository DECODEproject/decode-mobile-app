import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import Walkthrough from '../../screens/Walkthrough';

jest.mock('../../node_modules/ex-react-native-i18n', () => ({
  locales: { get: () => ({}) },
  t: () => 'Skip',
}));

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

const initialState = {
  navigation: {},
};

it('renders Walkthrough component', () => {
  const wrapper = shallow(
    <Walkthrough />,
    { context: { store: mockStore(initialState) } },
  );
  expect(wrapper.dive()).toMatchSnapshot();
});
