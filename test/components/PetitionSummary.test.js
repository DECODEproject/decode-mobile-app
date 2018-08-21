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
    },
    attributes: {
      list: new Map([['schema:dateOfBirth', {
        predicate: 'schema:dateOfBirth',
        object: 'voter',
        scope: 'can-access',
      }]]),
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

  it('should show one mandatory attribute, if the petition has one mandatory attribute loaded, and the wallet has that attribute', () => {
    const store = mockStore(initialStateWithMandatoryAttribute);
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

    const attributeWrapper = wrapper.dive().dive().find(Text).findWhere(n => n.text() === 'Fecha de Nacimiento');

    expect(attributeWrapper).toHaveLength(1);
  });

  describe('disabled attribute ', () => {
    const store = mockStore(initialStateWithMandatoryAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();


    it('should have a default state', () => {
      expect(wrapper.state('enabledAttributes')).toEqual([{ predicate: 'schema:addressLocality' }]);
    });

    it('on change state to disable the attribute, the attribute should be disabled', () => {
      wrapper.setState({ enabledAttributes: [] });
      const attributeWrapper = wrapper.find(AttributeComponent);
      expect(attributeWrapper.prop('isEnabled')).toEqual(false);
    });

    it('on toggle an enabled attribute, this should be disabled', () => {
      let attributeWrapper = wrapper.find(AttributeComponent);
      attributeWrapper.simulate('valueChanged');
      attributeWrapper = wrapper.find(AttributeComponent);

      expect(attributeWrapper.prop('isEnabled')).toEqual(false);
      expect(wrapper.state('enabledAttributes')).toEqual([]);
    });

    it('should show error text if the attribute is mandatory', () => {
      const attributeWrapper = wrapper.find(AttributeComponent);
      expect(attributeWrapper.first().prop('isEnabled')).toEqual(false);
      expect(attributeWrapper.first().prop('isMandatory')).toEqual(true);
      expect(attributeWrapper.first().dive().find(Text).findWhere(n => n.text() === `You must consent to sharing your status as a Barcelona resident or
      you cannot sign this petition. This information is anonymous.`));
    });
  });

  it('should have a translated name', () => {
    const store = mockStore(initialStateWithMandatoryAttribute);
    const wrapper = shallow(<PetitionSummary />)
      .first().shallow()
      .first()
      .shallow({ context: { store } });

    const attributeWrapper = wrapper.dive().find(AttributeComponent);

    expect(attributeWrapper.first().prop('name')).toEqual('Residencia - Barcelona');
  });
});
