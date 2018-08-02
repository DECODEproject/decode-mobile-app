import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16/build/index';
import configureStore from 'redux-mock-store';
import { Text, FlatList } from 'react-native';
import AttributesLanding from '../../screens/AttributesLanding';
import Button from '../../application/components/Button/Button';


jest.mock('../../node_modules/ex-react-native-i18n', () => ({
  locales: { get: () => ({}) },
}));

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('AttributesLanding', () => {
  it('should go to New attributes screen', () => {
    const initialState = {
      navigation: {
        currentNavigatorUID: 2,
      },
      attributes: {
        list: [],
      },
    };
    const store = mockStore(initialState);
    const wrapper = shallow(
      <AttributesLanding />,
      { context: { store } },
    );

    const addAttributeButton = wrapper.dive().find(Button);

    addAttributeButton.props().onPress();
    expect(store.getActions()[0].child.routeName).toEqual('newAttributes');
  });

  describe('if there are no attributes saved', () => {
    it('it should show a [PLACEHOLDER]', () => {
      const initialState = {
        attributes: {
          list: [],
        },
      };
      const store = mockStore(initialState);

      const wrapper = shallow(
        <AttributesLanding />,
        { context: { store } },
      );

      const TextWrappers = wrapper.dive().dive().find(Text).findWhere(n => n.text() === 'You have no data :(');
      expect(TextWrappers).toHaveLength(1);
    });
  });

  describe('if there is an attribute', () => {
    it('should show a list containing that attribute', () => {
      const initialState = {
        attributes: {
          list: [
            {
              predicate: 'schema:birthDate',
              object: '04/09/1985',
              scope: 'can-access',
              provenance: {
                source: '',
                credentials: '',
                verified: false,
              },
              subject: 'Jordi',
            },
          ],
        },
      };
      const store = mockStore(initialState);

      const wrapper = shallow(
        <AttributesLanding />,
        { context: { store } },
      );

      const FlatListWrapper = wrapper.dive().dive().find(FlatList);
      expect(FlatListWrapper).toHaveLength(1);
      expect(FlatListWrapper.props().data).toEqual(initialState.attributes.list);
    });
  });
});
