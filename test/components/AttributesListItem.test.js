import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build/index';
import { Text } from 'react-native';
import AttributeListItem from '../../application/components/AttributeListItem/AttributeListItem';

Enzyme.configure({ adapter: new Adapter() });

describe('AttributesListItem', () => {
  describe('if there is a residency attribute', () => {
    it('should display Residency - some city', () => {
      const attribute = {
        predicate: 'schema:addressLocality',
        object: 'some city',
        scope: 'can-access',
        provenance: {
          source: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
          credentials: '0123456789',
        },
        subject: '(Alpaca)',
      };

      const wrapper = shallow(<AttributeListItem attribute={{ item: attribute }} />)
        .first().shallow().dive();

      const LabelWrappers = wrapper.dive().find(Text).findWhere(n => n.text() === 'Estado de Residencia');
      expect(LabelWrappers).toHaveLength(1);

      const ValueWrappers = wrapper.dive().find(Text).findWhere(n => n.text() === 'some city');
      expect(ValueWrappers).toHaveLength(1);
    });
  });

  describe('if there is a birthDate attribute', () => {
    it('should display Date of Birth - some date', () => {
      const attribute = {
        predicate: 'schema:dateOfBirth',
        object: 'some date',
        scope: 'can-access',
        provenance: {
          source: '',
          credentials: '',
          verified: false,
        },
        subject: 'Jordi',
      };

      const wrapper = shallow(<AttributeListItem attribute={{ item: attribute }} />)
        .first().shallow().dive();

      const LabelWrappers = wrapper.find(Text).findWhere(n => n.text() === 'Fecha de Nacimiento');
      expect(LabelWrappers).toHaveLength(1);

      const ValueWrappers = wrapper.dive().find(Text).findWhere(n => n.text() === 'some date');
      expect(ValueWrappers).toHaveLength(1);
    });
  });
});
