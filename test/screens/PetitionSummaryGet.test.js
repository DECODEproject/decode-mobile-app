import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import PetitionSummaryGet from '../../screens/PetitionSummaryGet';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

const initialState = {
  petitionLink: {
    petitionLink: 'http://something.com',
  },
  petition: {
    petition: {
      title: 'hello',
      description: 'world',
      closingDate: 'today',
    },
  },
  wallet: {
    id: 'something',
  },
};

it('renders PetitionSummaryGet component', () => {
  const wrapper = shallow(
    <PetitionSummaryGet />,
    { context: { store: mockStore(initialState) } },
  );
  expect(wrapper.dive()).toMatchSnapshot();
});
