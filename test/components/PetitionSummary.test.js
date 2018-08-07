import React from 'react';
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
      petitionAttributes: [],
      enabledAttributes: [],
    },
    petitionLink: { petitionLink: 'aLink.com' },
    attributes: {
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
        petitionAttributes: [{
          predicate: 'schema:addressLocality',
          provenance: {
            source: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
          },
        }],
        enabledAttributes: [],
      },
      petitionLink: { petitionLink: 'aLink.com' },
      attributes: {
        list: [],
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
    expect(attributeWrapper.first().prop('isMandatory')).toEqual(true);
  });

  it('should show one optional attribute, if the petition has one optional attribute loaded', () => {
    const initialStateWithAttribute = {
      petition: {
        loaded: false,
        petition: {},
        error: undefined,
        signed: false,
        petitionAttributes: [{
          predicate: 'schema:DateOfBirth',
        }],
        enabledAttributes: [],
      },
      petitionLink: { petitionLink: 'aLink.com' },
      attributes: {
        list: [],
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
    expect(attributeWrapper.first().prop('isMandatory')).toEqual(false);
  });

  it('should have the attribute disable if it is not inside the enableAttributes', () => {
    const initialStateWithAttribute = {
      petition: {
        loaded: false,
        petition: {},
        error: undefined,
        signed: false,
        petitionAttributes: [{
          predicate: 'schema:DateOfBirth',
        }],
        enabledAttributes: [],
      },
      petitionLink: { petitionLink: 'aLink.com' },
      attributes: {
        list: [],
      },
      wallet: { id: '' },
    };
    const store = mockStore(initialStateWithAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const attributeWrapper = wrapper.dive().find(AttributeComponent);

    expect(attributeWrapper.first().prop('isEnabled')).toEqual(false);
  });

  it('should have a translated name', () => {
    const initialStateWithAttribute = {
      petition: {
        loaded: false,
        petition: {},
        error: undefined,
        signed: false,
        petitionAttributes: [{
          predicate: 'schema:addressLocality',
          provenance: {
            source: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
          },
        }],
        enabledAttributes: [],
      },
      petitionLink: { petitionLink: 'aLink.com' },
      attributes: {
        list: [],
      },
      wallet: { id: '' },
    };
    const store = mockStore(initialStateWithAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const attributeWrapper = wrapper.dive().find(AttributeComponent);

    expect(attributeWrapper.first().prop('name')).toEqual('Estado de Residencia (requerido)');
  });
});
