import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../App';
import Router from '../../Router';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  describe('go to initial screen', () => {
    it('should go to walkthrough if no pin has been saved', () => {
      const wrapper = shallow(<App />);

      const appComponent = wrapper.instance();

      const routerSpy = jest.spyOn(Router, 'getRoute');

      appComponent.goToInitialScreen();

      expect(routerSpy).toBeCalledWith('walkthrough');
    });
  });
});
