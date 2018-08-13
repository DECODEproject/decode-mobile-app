import React from 'react';
import { Text } from 'react-native';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build/index';
import Button from '../../application/components/Button/Button';
import PetitionSummary from '../../screens/PetitionSummary';
import AttributeComponent from '../../application/components/Attribute/Attribute';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('The PetitionSummary page', () => {
  const initialState = {
    petition: {
      loaded: false,
      petition: {},
      error: undefined,
      signed: false,
      petitionAttributes: {
        mandatory: [],
        optional: [],
        missing: [],
      },
      enabledAttributes: [],
    },
    petitionLink: { petitionLink: 'aLink.com' },
    attributes: {
      list: new Map(),
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
  });

  it('should show no attributes, if the petition has no attributes loaded', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    expect(wrapper.dive().find(AttributeComponent)).toHaveLength(0);
  });

  it('should show one required attribute, if the petition has one required attribute loaded', () => {
    const initialStateWithAttribute = {
      petition: {
        loaded: false,
        petition: {},
        error: undefined,
        signed: false,
        petitionAttributes: {
          mandatory: [{
            predicate: 'schema:addressLocality',
            provenance: {
              source: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
            },
          }],
          optional: [],
          missing: [],
        },
        enabledAttributes: [],
      },
      petitionLink: { petitionLink: 'aLink.com' },
      attributes: {
        list: new Map(),
      },
      wallet: { id: '' },
    };
    const store = mockStore(initialStateWithAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const attributeWrapper = wrapper.dive().find(AttributeComponent);

    expect(attributeWrapper).toHaveLength(1);
  });

  it('should show one optional attribute, if the petition has one optional attribute loaded', () => {
    const initialStateWithAttribute = {
      petition: {
        loaded: false,
        petition: {},
        error: undefined,
        signed: false,
        petitionAttributes: {
          mandatory: [],
          optional: [{
            predicate: 'schema:DateOfBirth',
          }],
          missing: [],
        },
        enabledAttributes: [],
      },
      petitionLink: { petitionLink: 'aLink.com' },
      attributes: {
        list: new Map(),
      },
      wallet: { id: '' },
    };
    const store = mockStore(initialStateWithAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const attributeWrapper = wrapper.dive().find(AttributeComponent);

    expect(attributeWrapper).toHaveLength(1);
  });
  describe('disabled attribute ', () => {
    const initialStateWithAttribute = {
      petition: {
        loaded: false,
        petition: {},
        error: undefined,
        signed: false,
        petitionAttributes: {
          mandatory: [{
            predicate: 'schema:DateOfBirth',
          }],
          optional: [],
          missing: [],
        },
        enabledAttributes: [],
      },
      petitionLink: { petitionLink: 'aLink.com' },
      attributes: {
        list: new Map(),
      },
      wallet: { id: '' },
    };
    const store = mockStore(initialStateWithAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const attributeWrapper = wrapper.dive().find(AttributeComponent);

    it('should not have the attribute listed inside the enableAttributes', () => {
      expect(attributeWrapper.first().prop('isEnabled')).toEqual(false);
    });

    it('should show error text if the attribute is mandatory', () => {
      expect(attributeWrapper.first().prop('isMandatory')).toEqual(true);
      expect(attributeWrapper.dive().find(Text).findWhere(n => n.text() === `You must consent to sharing your status as a Barcelona resident or
      you cannot sign this petition. This information is anonymous.`));
    });
  });

  it('should have the attribute enables if it is inside the enableAttributes', () => {
    const initialStateWithAttribute = {
      petition: {
        loaded: false,
        petition: {},
        error: undefined,
        signed: false,
        petitionAttributes: {
          mandatory: [],
          optional: [{
            predicate: 'schema:DateOfBirth',
          }],
          missing: [],
        },
        enabledAttributes: [{
          predicate: 'schema:DateOfBirth',
        }],
      },
      petitionLink: { petitionLink: 'aLink.com' },
      attributes: {
        list: new Map(),
      },
      wallet: { id: '' },
    };
    const store = mockStore(initialStateWithAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const attributeWrapper = wrapper.dive().find(AttributeComponent);

    expect(attributeWrapper.first().prop('isEnabled')).toEqual(true);
  });


  it('should have a translated name', () => {
    const initialStateWithAttribute = {
      petition: {
        loaded: false,
        petition: {},
        error: undefined,
        signed: false,
        petitionAttributes: {
          mandatory: [{
            predicate: 'schema:addressLocality',
            object: 'Barcelona',
            provenance: {
              source: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
            },
          }],
          optional: [],
          missing: [],
        },
        enabledAttributes: [],
      },
      petitionLink: { petitionLink: 'aLink.com' },
      attributes: {
        list: new Map(),
      },
      wallet: { id: '' },
    };
    const store = mockStore(initialStateWithAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const attributeWrapper = wrapper.dive().find(AttributeComponent);

    expect(attributeWrapper.first().prop('name')).toEqual('Estado de Residencia - Barcelona');
  });
});
