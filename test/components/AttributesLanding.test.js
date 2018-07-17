import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16/build/index';
import configureStore from 'redux-mock-store';
import { Text } from 'react-native';
import AttributesLanding from '../../screens/AttributesLanding';


Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('AttributesLanding', () => {
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

      const TextWrappers = wrapper.dive().find(Text).findWhere(n => n.text() === 'You have no data :(');
      expect(TextWrappers).toHaveLength(1);
    });
  });

//   describe('if there is one non-verified attribute', () => {
//     it('should show the name of that attribute', () => {
//       const initialState = {
//         attributes: {
//           isRequiredAttributeEnabled: false,
//           optionalAttributesToggleStatus: {
//             age: false,
//             gender: false,
//           },
//           nonVerified: [
//             {
//               name: 'Date of Birth',
//               value: '01/01/2000',
//             },
//           ],
//         },
//       };
//       const store = mockStore(initialState);
//
//       const wrapper = shallow(
//         <AttributesLanding />,
//         { context: { store } },
//       );
//
//       const TextWrappers = wrapper.dive().find(Text)
// .findWhere(n => n.text() === 'Date of Birth');
//       expect(TextWrappers).toHaveLength(1);
//     });
//   });
//
//   describe('if there are multiple non-verified attributes', () => {
//     it('should show the name of all attributes', () => {
//       const initialState = {
//         attributes: {
//           isRequiredAttributeEnabled: false,
//           optionalAttributesToggleStatus: {
//             age: false,
//             gender: false,
//           },
//           nonVerified: [
//             {
//               name: 'Date of Birth',
//               value: '01/01/2000',
//             },
//             {
//               name: 'Gender',
//               value: 'Female',
//             },
//           ],
//         },
//       };
//       const store = mockStore(initialState);
//
//       const wrapper = shallow(
//         <AttributesLanding />,
//         { context: { store } },
//       );
//
//       const TextWrappers = wrapper.dive().find(Text);
//       expect(TextWrappers).toHaveLength(2);
//     });
// });
});
