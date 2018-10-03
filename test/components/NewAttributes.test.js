import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16/build/index';
import configureStore from 'redux-mock-store';
import NewAttributes from '../../screens/NewAttributes';
import Button from '../../application/components/Button/Button';
import types from '../../application/redux/actionTypes';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('NewAttributes', () => {
  describe('add date of birth', () => {
    it('should show add button when no age attribute is stored', () => {
      const initialState = {
        attributes: {
          list: new Map(),
          errorSaveAttributes: false,
        },
        wallet: {
          id: 'something',
        },
      };

      const store = mockStore(initialState);
      const wrapper = shallow(<NewAttributes />)
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
        attributes: {
          list: new Map([['schema:dateOfBirth', {
            object: '20/08/2018',
          }]]),
          errorSaveAttributes: false,
        },
        wallet: {
          id: 'something',
        },
      };

      const store = mockStore(initialState);
      const wrapper = shallow(<NewAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } });

      const button = wrapper.dive().find({ id: 'age-action-button' });
      const info = wrapper.dive().find({ id: 'age-info' });

      expect(button.prop('name')).toEqual('Editar');
      expect(info.prop('children')).toEqual('20/08/2018');
    });

    it('should change state when setting date through modal', () => {
      const initialState = {
        attributes: {
          list: new Map(),
          errorSaveAttributes: false,
        },
        wallet: {
          id: 'something',
        },
      };

      const store = mockStore(initialState);
      const wrapper = shallow(<NewAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } })
        .dive();

      const newAttributes = wrapper.instance();
      newAttributes.onSetDateOfBirth(new Date(1985, 8, 4));

      expect(wrapper.state()).toEqual({
        currentDate: '04/09/1985',
        district: '',
        isDatePickerVisible: false,
      });
    });
  });

  describe('add district', () => {
    it('should show add button when no district attribute is stored', () => {
      const initialState = {
        attributes: {
          list: new Map(),
          errorSaveAttributes: false,
        },
        wallet: {
          id: 'something',
        },
      };

      const store = mockStore(initialState);
      const wrapper = shallow(<NewAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } });

      const button = wrapper.dive().find({ id: 'district-action-button' });
      const info = wrapper.dive().find({ id: 'district-info' });

      expect(button.prop('name')).toEqual('Agregar');
      expect(info.prop('children')).toEqual(undefined);
    });

    it('should show edit button when district attribute is stored', () => {
      const initialState = {
        attributes: {
          list: new Map([['schema:district', { object: '4' }]]),
          errorSaveAttributes: false,
        },
        wallet: {
          id: 'something',
        },
      };

      const store = mockStore(initialState);
      const wrapper = shallow(<NewAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } });

      const button = wrapper.dive().find({ id: 'district-action-button' });
      const info = wrapper.dive().find({ id: 'district-info' });

      expect(button.prop('name')).toEqual('Editar');
      expect(info.prop('children')).toEqual('Les Corts');
    });

    it('should change state when setting district through modal', () => {
      const initialState = {
        attributes: {
          list: new Map(),
          errorSaveAttributes: false,
        },
        wallet: {
          id: 'something',
        },
      };

      const store = mockStore(initialState);
      const wrapper = shallow(<NewAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } })
        .dive();

      const newAttributes = wrapper.instance();
      newAttributes.onSetDistrict('3');

      expect(wrapper.state()).toEqual({
        currentDate: '',
        district: '3',
        isDatePickerVisible: false,
      });
    });
  });

  describe('save button', () => {
    it('should trigger action to save attributes', async () => {
      const initialState = {
        navigation: {
          currentNavigatorUID: 2,
        },
        wallet: {
          id: '123',
        },
        attributes: {
          list: new Map(),
          errorSaveAttributes: false,
        },
      };
      const store = mockStore(initialState);

      const wrapper = shallow(<NewAttributes />)
        .first().shallow()
        .first()
        .shallow({ context: { store } })
        .dive();

      wrapper.instance().setState({
        currentDate: '01/01/2000',
        district: '3',
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
