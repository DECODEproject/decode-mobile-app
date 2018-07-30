import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import Home from '../../screens/Home';

jest.mock('../../node_modules/ex-react-native-i18n', () => ({
  locales: { get: () => ({}) },
}));

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

const initialState = {
  petitionLink: {
    petitionLink: undefined,
  },
  authorization: {},
  attributes: {
    list: [],
  },
};


it('renders Home component', () => {
  const wrapper = shallow(
    <Home />,
    { context: { store: mockStore(initialState) } },
  );
  expect(wrapper.dive()).toMatchSnapshot();
});
