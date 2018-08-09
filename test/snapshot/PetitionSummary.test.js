import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import PetitionSummary from '../../screens/PetitionSummary';

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
      id: '1234',
    },
    enabledAttributes: [],
    petitionAttributes: {
      mandatory: [],
      optional: [],
    },
  },
  wallet: {
    id: 'something',
  },
  attributes: {
    isRequiredAttributeEnabled: true,
    optionalAttributesToggleStatus: {
      age: false,
      gender: false,
    },
    list: new Map(),
  },
};

it('renders PetitionSummary component when no attributes exist', () => {
  const wrapper = shallow(<PetitionSummary />)
    .first().shallow()
    .first()
    .shallow({ context: { store: mockStore(initialState) } });

  expect(wrapper.dive()).toMatchSnapshot();
});

it('renders PetitionSummary component when all attributes are verified', () => {
  const state = {
    ...initialState,
    attributes: {
      ...initialState.attributes,
      list: new Map([
        ['schema:addressLocality', {
          predicate: 'schema:addressLocality',
          object: 'Barcelona',
          scope: 'can-access',
          provenance: {
            source: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
            credentials: '0123456789',
          },
          subject: '(Alpaca)',
        }],
      ]),
    },
  };
  const wrapper = shallow(<PetitionSummary />)
    .first().shallow()
    .first()
    .shallow({ context: { store: mockStore(state) } });

  expect(wrapper.dive()).toMatchSnapshot();
});
