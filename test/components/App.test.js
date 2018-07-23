import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../App';
import Router from '../../Router';


Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  describe('go to initial screen', () => {
    it('should go to walkthrough if no pin has been saved', async () => {
      const getItemAsync = jest.fn().mockReturnValue(Promise.resolve(undefined));
      const routerSpy = jest.spyOn(Router, 'getRoute');

      const wrapper = shallow(<App />);

      const appComponent = wrapper.instance();


      await appComponent.goToInitialScreen(getItemAsync);
      expect(routerSpy).toBeCalledWith('walkthrough');
    });

    it('should go to home screen login if pin has been saved', async () => {
      const routerSpy = jest.spyOn(Router, 'getRoute');
      const wrapper = shallow(<App />);
      const appComponent = wrapper.instance();

      const getItemAsync = jest.fn().mockReturnValue(Promise.resolve('1234'));


      await appComponent.goToInitialScreen(getItemAsync);
      expect(routerSpy).toBeCalledWith('home');
    });
  });
});
