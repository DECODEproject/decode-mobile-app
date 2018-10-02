import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import Home from '../../screens/Home';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

const initialState = {
  decidimInfo: {
    decidimAPIUrl: undefined,
  },
  authorization: {},
  attributes: {
    list: new Map(),
  },
};


it('renders Home component', () => {
  const wrapper = shallow(
    <Home />,
    { context: { store: mockStore(initialState) } },
  );
  expect(wrapper.dive()).toMatchSnapshot();
});
