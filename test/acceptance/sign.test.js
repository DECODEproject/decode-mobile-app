import React from 'react';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import PetitionSummary from '../../screens/PetitionSummary';
// import Button from '../../application/components/Button/Button';
// import { jsdom } from 'jsdom'
Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);


// global.document = jsdom('');
// global.window = document.defaultView;
//
// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     global[property] = document.defaultView[property];
//   }
// });

describe('signing a petition', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {
      petitionLink: {
        petitionLink: 'http://something.com',
      },
      petition: {
      },
      wallet: {
        id: 'something',
      },
      attributes: {
        isRequiredAttributeEnabled: true,
        list: [],
      },
    };

    store = mockStore(initialState);
  });


  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should not allow me to sign if required attributes are there', () => {
    // GIVEN a petition with X attributes
    const newPetition = {
      petition: {
        id: '2',
        isEthereum: 'true',
      },
    };

    fetchMock.getOnce(initialState.petitionLink.petitionLink, newPetition);

    // WHEN
    const wrapper = shallow(
      <PetitionSummary />,
      { context: { store } },
    );
    console.log(wrapper);


    // THEN

    // expect(wrapper.find(Button).length).toEqual(0);
  });
});

// NEXT ITERATIONS OF THE TEST:
// Use library cucumber style


// clearState

// before()

// GIVEN a petition with X attributes
//     state.config.petitionurl = ''
//     mock fetch getpetition

// AND I am missing some of the required attributes
//     []

// WHEN I review the petition
//     petitionSummary.shallowMount()

// THEN I am not able to sign
//     petitionSummary.find(submitbutton.disabled == true)
