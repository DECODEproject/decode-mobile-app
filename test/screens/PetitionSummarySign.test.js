import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import PetitionSummarySign from '../../screens/PetitionSummarySign';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

const initialState = {
  petition: {
    petition: {
      id: '1234',
      isEthereum: 'false',
    },
  },
  wallet: {
    id: 'my-wallet-id-numbeeeeeeeeeeer',
  },
};

it('renders PetitionSummarySign component', () => {
  const wrapper = shallow(
    <PetitionSummarySign />,
    { context: { store: mockStore(initialState) } },
  );
  expect(wrapper.dive()).toMatchSnapshot();
});
