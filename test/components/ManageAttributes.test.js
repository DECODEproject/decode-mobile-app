import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16/build/index';
import configureStore from 'redux-mock-store';
import ManageAttributes from '../../screens/ManageAttributes';
import Button from '../../application/components/Button/Button';
import types from '../../application/redux/actionTypes';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('ManageAttributes', () => {
  const defaultState = {
    attributes: {
      list: new Map(),
      errorSaveAttributes: false,
    },
    featureToggles: {
      enabledDeleteButton: false,
      genderAttribute: true,
    },
    wallet: {
      id: 'something',
    },
  };

  describe('add date of birth', () => {
    it('should show add button when no age attribute is stored', () => {
      const store = mockStore(defaultState);
      const wrapper = shallow(<ManageAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } });

      const button = wrapper.dive().find({ id: 'age-action-button' });
      const info = wrapper.dive().find({ id: 'age-info' });

      expect(button.prop('name')).toEqual('Agregar');
      expect(info.prop('children')).toEqual('');
    });

    it('should show edit button when age attribute is stored', () => {
      const initialState = {
        ...defaultState,
        attributes: {
          list: new Map([['schema:dateOfBirth', {
            object: '20/08/2018',
          }]]),
          errorSaveAttributes: false,
        },
      };

      const store = mockStore(initialState);
      const wrapper = shallow(<ManageAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } });

      const button = wrapper.dive().find({ id: 'age-action-button' });
      const info = wrapper.dive().find({ id: 'age-info' });

      expect(button.prop('name')).toEqual('Editar');
      expect(info.prop('children')).toEqual('20/08/2018');
    });

    it('should change state when setting date through modal', () => {
      const store = mockStore(defaultState);
      const wrapper = shallow(<ManageAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } })
        .dive();

      const manageAttributes = wrapper.instance();
      manageAttributes.onSetDateOfBirth(new Date(1985, 8, 4));

      expect(wrapper.state()).toEqual({
        currentDate: '04/09/1985',
        district: '',
        gender: '',
        isDatePickerVisible: false,
      });
    });
  });

  describe('add district', () => {
    it('should show add button when no district attribute is stored', () => {
      const store = mockStore(defaultState);
      const wrapper = shallow(<ManageAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } });

      const districtComponent = wrapper.dive().find({ id: 'district' }).dive();
      const button = districtComponent.find({ id: 'district-action-button' });
      const info = districtComponent.find({ id: 'district-info' });

      expect(button.prop('name')).toEqual('Agregar');
      expect(info.prop('children')).toEqual(undefined);
    });

    it('should show edit button when district attribute is stored', () => {
      const initialState = {
        ...defaultState,
        attributes: {
          list: new Map([['schema:district', { object: '4' }]]),
          errorSaveAttributes: false,
        },
      };

      const store = mockStore(initialState);
      const wrapper = shallow(<ManageAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } });

      const districtComponent = wrapper.dive().find({ id: 'district' }).dive();
      const button = districtComponent.find({ id: 'district-action-button' });
      const info = districtComponent.find({ id: 'district-info' });

      expect(button.prop('name')).toEqual('Editar');
      expect(info.prop('children')).toEqual('Les Corts');
    });

    it('should change state when setting district through modal', () => {
      const store = mockStore(defaultState);
      const wrapper = shallow(<ManageAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } })
        .dive();

      const manageAttributes = wrapper.instance();
      manageAttributes.onSetDistrict('3');

      expect(wrapper.state()).toEqual({
        currentDate: '',
        district: '3',
        gender: '',
        isDatePickerVisible: false,
      });
    });

    it('should not change state when the placeholder district is selected', () => {
      const store = mockStore(defaultState);
      const wrapper = shallow(<ManageAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } })
        .dive();

      const manageAttributes = wrapper.instance();
      manageAttributes.onSetDistrict('0');

      expect(wrapper.state()).toEqual({
        currentDate: '',
        district: '',
        gender: '',
        isDatePickerVisible: false,
      });
    });
  });

  describe('add gender', () => {
    it('should show add button when no gender attribute is stored', () => {
      const store = mockStore(defaultState);
      const wrapper = shallow(<ManageAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } });

      const genderComponent = wrapper.dive().find({ id: 'gender' }).dive();
      const button = genderComponent.find({ id: 'gender-action-button' });
      const info = genderComponent.find({ id: 'gender-info' });

      expect(button.prop('name')).toEqual('Agregar');
      expect(info.prop('children')).toEqual('');
    });

    it('should show edit button when gender attribute is stored', () => {
      const initialState = {
        ...defaultState,
        attributes: {
          list: new Map([['schema:gender', { object: 'F' }]]),
          errorSaveAttributes: false,
        },
      };

      const store = mockStore(initialState);
      const wrapper = shallow(<ManageAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } });

      const genderComponent = wrapper.dive().find({ id: 'gender' }).dive();
      const button = genderComponent.find({ id: 'gender-action-button' });
      const info = genderComponent.find({ id: 'gender-info' });

      expect(button.prop('name')).toEqual('Editar');
      expect(info.prop('children')).toEqual('female');
    });

    it('should change state when setting gender through modal', () => {
      const store = mockStore(defaultState);
      const wrapper = shallow(<ManageAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } })
        .dive();

      const manageAttributes = wrapper.instance();
      manageAttributes.onSetGender('F');

      expect(wrapper.state()).toEqual({
        currentDate: '',
        gender: 'F',
        district: '',
        isDatePickerVisible: false,
      });
    });

    it('should not change state when the placeholder gender is selected', () => {
      const store = mockStore(defaultState);
      const wrapper = shallow(<ManageAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } })
        .dive();

      const manageAttributes = wrapper.instance();
      manageAttributes.onSetGender(0);

      expect(wrapper.state()).toEqual({
        currentDate: '',
        gender: '',
        district: '',
        isDatePickerVisible: false,
      });
    });
  });

  describe('save button', () => {
    it('should trigger action to save attributes', async () => {
      const initialState = {
        ...defaultState,
        navigation: {
          currentNavigatorUID: 2,
        },
      };
      const store = mockStore(initialState);

      const wrapper = shallow(<ManageAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } })
        .dive();

      wrapper.instance().setState({
        currentDate: '01/01/2000',
        district: '3',
        gender: 'F',
      });

      const saveButton = wrapper.dive().find(Button);
      await saveButton.props().onPress();

      const expectedAction = {
        type: types.SAVE_ATTRIBUTES,
        dateOfBirth: '01/01/2000',
        district: '3',
      };
      const containsExpectedAction = expect.arrayContaining([expectedAction]);
      expect(store.getActions()).toEqual(containsExpectedAction);
    });
  });
});
