import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  describe('go to initial screen', () => {
    const routerMock = jest.fn();

    afterEach(() => {
      routerMock.mockClear();
    });

    it('should go to walkthrough if no pin has been saved', async () => {
      const retrievePinMock = jest.fn().mockReturnValue(Promise.resolve(undefined));

      const wrapper = shallow(<App />);
      const appComponent = wrapper.instance();

      await appComponent.goToInitialScreen(retrievePinMock, routerMock);
      expect(routerMock).toBeCalledWith('walkthrough');
      expect(routerMock.mock.calls.length).toBe(1);
    });

    xit('should go to home screen login if pin has been saved', async () => {
      const wrapper = shallow(<App />);
      const appComponent = wrapper.instance();

      const retrievePinMock = jest.fn().mockReturnValue(Promise.resolve('1234'));

      await appComponent.goToInitialScreen(retrievePinMock, routerMock);
      expect(routerMock).toBeCalledWith('home');
      expect(routerMock.mock.calls.length).toBe(1);
    });

    describe('if there is an exception retrieving the pin', () => {
      it('should go to walkthrough', async () => {
        const retrievePinMock = jest.fn().mockImplementation(() => {
          throw new Error();
        });

        const wrapper = shallow(<App />);
        const appComponent = wrapper.instance();

        await appComponent.goToInitialScreen(retrievePinMock, routerMock);
        expect(routerMock).toBeCalledWith('walkthrough');
        expect(routerMock.mock.calls.length).toBe(1);
      });
    });
  });
});
