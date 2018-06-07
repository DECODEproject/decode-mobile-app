import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import Home from '../../screens/Home';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('goToNextPage', () => {
  it('should call goQRScannerIntro if there is no petitionLink', () => {
    const initialState = {
      petitionLink: {
        petitionLink: undefined,
      },
    };

    const goQRScannerIntroMock = jest.fn();
    const wrapper = shallow(
      <Home />,
      { context: { store: mockStore(initialState) } },
    );
    const homeComponent = wrapper.dive().instance();
    homeComponent.props = {
      ...homeComponent.props,
      goQRScannerIntro: goQRScannerIntroMock,
    };

    homeComponent.goToNextPage();

    expect(goQRScannerIntroMock).toBeCalled();
  });

  it('should call goToAuthorization if there is a petitionLink', () => {
    const goToAuthorizationMock = jest.fn();
    const somePetitionLink = 'http://city-counsil.com';
    const initialState = {
      petitionLink: {
        petitionLink: somePetitionLink,
      },
    };

    const wrapper = shallow(
      <Home />,
      { context: { store: mockStore(initialState) } },
    );
    const homeComponent = wrapper.dive().instance();
    homeComponent.props = {
      ...homeComponent.props,
      goToAuthorization: goToAuthorizationMock,
    };

    homeComponent.goToNextPage();

    expect(goToAuthorizationMock).toBeCalledWith(somePetitionLink);
  });
});
