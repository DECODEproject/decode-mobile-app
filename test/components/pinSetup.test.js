import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build/index';
import { TextInput } from 'react-native';
import PinSetup from '../../screens/PinSetup';
import Button from '../../application/components/Button/Button';


Enzyme.configure({ adapter: new Adapter() });

describe('PinSetup screen', () => {
  it('should have a two of text inputs', () => {
    const wrapper = shallow(<PinSetup />);

    expect(wrapper.dive().find(TextInput)).toHaveLength(2);
  });

  it('should have a button', () => {
    const wrapper = shallow(<PinSetup />);

    expect(wrapper.dive().find(Button)).toHaveLength(1);
  });
});
