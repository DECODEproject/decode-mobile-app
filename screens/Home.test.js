import React from 'react';
import renderer from 'react-test-renderer';
import Home from './Home';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);


const initialState = {
  petitionLink: {
    petitionLink: undefined
  },
};


it('renders Home component', () => {
  const wrapper = shallow(
    <Home />,
    { context: { store: mockStore(initialState) } },
  );
  expect(wrapper.dive()).toMatchSnapshot();

  //const rendered = renderer.create(<Home />).toJSON();
  //expect(rendered).toMatchSnapshot();
});
