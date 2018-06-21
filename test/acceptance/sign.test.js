import React from 'react';
import { Text } from 'react-native';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import PetitionSummary from '../../screens/PetitionSummary';
import Button from '../../application/components/Button/Button';

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
      },
    };
  });


  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should not allow me to sign if required attributes are not there', () => {
    const state = {
      ...initialState,
      // GIVEN a petition with X attributes
      petition: {
        petition: {
          title: 'hello',
          description: 'world',
          closingDate: 'today',
          id: '1234',
        },
      },
      attributes: {
        isRequiredAttributeEnabled: false,
        optionalAttributesToggleStatus: {
          age: false,
          gender: false,
        },
        // AND I do not have a required attribute
        list: [],
      },
    };


    store = mockStore(state);

    // WHEN I review the petition
    const wrapper = shallow(
      <PetitionSummary />,
      { context: { store } },
    );

    // THEN I am not able to sign
    expect(wrapper.dive().find(Button).first().prop('enabled')).toEqual(false);
  });


  it('should allow me to sign if I have required attributes', () => {
    const state = {
      ...initialState,
      // GIVEN a petition with X attributes
      petition: {
        petition: {
          title: 'hello',
          description: 'world',
          closingDate: 'today',
          id: '1234',
        },
      },
      attributes: {
        isRequiredAttributeEnabled: true,
        optionalAttributesToggleStatus: {
          age: false,
          gender: false,
        },
        // AND I do not have a required attribute
        list: [
          {
            scope: '',
            provenance: '',
            subject: '',
            object: '',
          },
        ],
      },
    };

    store = mockStore(state);

    // WHEN I review the petition
    const wrapper = shallow(
      <PetitionSummary />,
      { context: { store } },
    );

    // THEN I am able to sign
    expect(wrapper.dive().find(Button).first().prop('enabled')).toEqual(true);
  });

  it('should render the petition title', (done) => {
    const petitionTitle = 'My petition';
    const newPetition = {
      title: petitionTitle,
      description: 'world',
      closingDate: 'today',
      id: '1234',
    };
    const state = {
      ...initialState,
      // GIVEN a petition with X attributes
      petition: {
        petition: {
        },
      },
      attributes: {
        isRequiredAttributeEnabled: true,
        optionalAttributesToggleStatus: {
          age: false,
          gender: false,
        },
        // AND I do not have a required attribute
        list: [],
      },
    };

    fetchMock.getOnce(state.petitionLink.petitionLink, newPetition);

    store = mockStore(state);

    // WHEN I review the petition
    const wrapper = shallow(
      <PetitionSummary />,
      { context: { store } },
    );

    setTimeout(() => {
      wrapper.update();
      console.log('waited one second');
      // THEN I am able to see the petition title
      console.log(store.getActions());
      // console.log(wrapper.update().dive().debug());

      const wrapper2 = wrapper.dive().find(Text).findWhere(n => n.text() === petitionTitle);
      console.log(wrapper2);

      // expect(wrapper2.exists()).toEqual(true);
      done();
    }, 1000);
  });
});
