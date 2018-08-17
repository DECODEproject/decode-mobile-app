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
      petition: {
        attributes: {
          mandatory: [],
          optional: [],
        },
      },
      error: undefined,
      signed: false,
      enabledAttributes: [],
    },
    petitionLink: { petitionLink: 'aLink.com' },
    attributes: {
      list: new Map(),
    },
    wallet: { id: '' },
  };

  const initialStateWithMandatoryAttribute = {
    ...initialState,
    petition: {
      ...initialState.petition,
      petition: {
        ...initialState.petition.petition,
        attributes: {
          mandatory: [{
            predicate: 'schema:addressLocality',
            provenance: {
              source: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
            },
          }],
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

  const initialStateWithOptionalAttribute = {
    ...initialState,
    petition: {
      ...initialState.petition,
      petition: {
        ...initialState.petition.petition,
        attributes: {
          mandatory: [],
          optional: [{
            predicate: 'schema:dateOfBirth',
            object: 'voter',
            scope: 'can-access',
          }],
        },
      },
      enabledAttributes: [],
    },
    attributes: {
      list: new Map([['schema:dateOfBirth', {}]]),
    },
  };

  const initialStateWithMissingAttribute = {
    ...initialState,
    petition: {
      ...initialState.petition,
      petition: {
        ...initialState.petition.petition,
        attributes: {
          mandatory: [],
          optional: [{
            predicate: 'schema:dateOfBirth',
            object: 'voter',
            scope: 'can-access',
          }],
        },
      },
      enabledAttributes: [],
    },
    petitionLink: { petitionLink: 'aLink.com' },
    attributes: {
      list: new Map(),
    },
    wallet: { id: '' },
  };

  const initialStateWithEnabledAttribute = {
    ...initialStateWithOptionalAttribute,
    petition: {
      ...initialStateWithOptionalAttribute.petition,
      enabledAttributes: [{
        predicate: 'schema:dateOfBirth',
      }],
    },
    attributes: {
      list: new Map([['schema:dateOfBirth', {
        predicate: 'schema:dateOfBirth',
        object: '01/01/1900',
        scope: 'can-access',
        provenance: {},
        subject: '(Alpaca)',
      }]]),
    },
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

  it('should show one mandatory attribute, if the petition has one mandatory attribute loaded, and the wallet has that attribute', () => {
    const store = mockStore(initialStateWithMandatoryAttribute);
    console.log('INITIAL STATE!!');
    console.log(JSON.stringify(initialStateWithMandatoryAttribute, null, 4));


    let wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    wrapper = wrapper.update();

    const attributeWrapper = wrapper.dive().find(AttributeComponent);

    expect(attributeWrapper).toHaveLength(1);
  });

  it('should show one optional attribute, if the petition has one optional attribute loaded and the wallet has that attribute', () => {
    const store = mockStore(initialStateWithOptionalAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const attributeWrapper = wrapper.dive().find(AttributeComponent);

    expect(attributeWrapper).toHaveLength(1);
  });

  it('should show one missing attribute, if the petition has an attribute loaded that the wallet does not have', () => {
    const store = mockStore(initialStateWithMissingAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const attributeWrapper = wrapper.dive().dive().find(Text).findWhere(n => n.text() === 'Edad');

    expect(attributeWrapper).toHaveLength(1);
  });

  describe('disabled attribute ', () => {
    const store = mockStore(initialStateWithMandatoryAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const attributeWrapper = wrapper.dive().find(AttributeComponent);

    it('should not have the attribute listed inside the enableAttributes', () => {
      expect(attributeWrapper.first().prop('isEnabled')).toEqual(false);
    });

    it('should show error text if the attribute is mandatory', () => {
      expect(attributeWrapper.first().prop('isEnabled')).toEqual(false);
      expect(attributeWrapper.first().prop('isMandatory')).toEqual(true);
      expect(attributeWrapper.first().dive().find(Text).findWhere(n => n.text() === `You must consent to sharing your status as a Barcelona resident or
      you cannot sign this petition. This information is anonymous.`));
    });
  });

  it('should have the attribute enabled if it is inside the enabledAttributes', () => {
    const store = mockStore(initialStateWithEnabledAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const attributeWrapper = wrapper.dive().find(AttributeComponent);

    expect(attributeWrapper.first().prop('isEnabled')).toEqual(true);
  });


  it('should have a translated name', () => {
    const store = mockStore(initialStateWithMandatoryAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const attributeWrapper = wrapper.dive().find(AttributeComponent);

    expect(attributeWrapper.first().prop('name')).toEqual('Estado de Residencia - Barcelona');
  });
});
