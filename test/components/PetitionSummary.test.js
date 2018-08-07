import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build/index';
import Button from '../../application/components/Button/Button';
import PetitionSummary from '../../screens/PetitionSummary';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('The PetitionSummary page', () => {
  const initialState = {
    petition: {
      loaded: false,
      petition: {},
      error: undefined,
      signed: false,
      petitionAttributes: [],
    },
    petitionLink: { petitionLink: 'aLink.com' },
    attributes: {
      optionalAttributesToggleStatus: {
        age: true,
        gender: true,
      },
      list: [],
    },
    wallet: { id: '' },
  };

  it('should show the voting buttons', () => {
    const store = mockStore(initialState);

    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const buttonWrapper = wrapper.dive().find(Button);

    expect(buttonWrapper).toHaveLength(2);
    // expect(buttonWrapper[0].prop('yes')).toEqual('Si');
    // expect(buttonWrapper[1].prop('no')).toEqual('No');
    // expect(buttonWrapper[0].prop('enabled')).toEqual(true);
    // expect(buttonWrapper[1].prop('enabled')).toEqual(true);
  });
});
