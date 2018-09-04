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

describe('signing a petition', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {
      decidimInfo: {
        petitionLink: 'http://something.com',
        decidimAPIUrl: 'http://another.com',
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
      petition: {
        petition: {
          title: 'hello',
          description: 'world',
          closingDate: 'today',
          id: '1234',
          attributes: {
            mandatory: [{ predicate: 'schema:addressLocality' }],
            optional: [],
          },
        },
      },
      attributes: {
        list: new Map(),
      },
    };


    store = mockStore(state);

    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();

    wrapper.setState({ enabledAttributes: [] });
    expect(wrapper.find(Button).first().prop('enabled')).toEqual(false);
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
          attributes: {
            mandatory: [{ predicate: 'schema:addressLocality' }],
            optional: [],
          },
        },
      },
      attributes: {
        list: new Map([['schema:addressLocality', {
          predicate: 'schema:addressLocality',
          object: 'Barcelona',
          provenance: {
            source: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
          },
        }]]),
      },
    };

    store = mockStore(state);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

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
      petition: {
        petition: {
          attributes: {
            mandatory: [],
            optional: [],
            missing: [],
          },
        },
      },
      attributes: {
        list: new Map(),
      },
    };

    fetchMock.getOnce(state.decidimInfo.petitionLink, newPetition);

    store = mockStore(state);

    // WHEN I review the petition
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    setTimeout(() => {
      wrapper.update();
      wrapper.dive().find(Text).findWhere(n => n.text() === petitionTitle);
      done();
    }, 1000);
  });
});
