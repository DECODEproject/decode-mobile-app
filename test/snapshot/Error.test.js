import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import Error from '../../screens/Error';

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

it('renders Error component', () => {
  const state = {
    ...initialState,
    signOutcome: {
      signSuccess: true,
    },
  };
  const wrapper = shallow(
    <Error
      title="Some title"
      petitionError="There was an error"
    />,
    { context: { store: mockStore(state) } },
  );
  expect(wrapper.dive()).toMatchSnapshot();
});

