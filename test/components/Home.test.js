import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import Home from '../../screens/Home';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('goToNextPage', () => {
  const somePetitionLink = 'http://city-counsil.com';
  const alertMock = jest.fn();
  const goToAttributesSummaryMock = jest.fn();
  const goQRScannerIntroMock = jest.fn();

  beforeEach(() => {
    global.alert = alertMock;
  });

  afterEach(() => {
    global.alert = undefined;
  });

  describe('if the user puts the incorrect pin', () => {
    it('should show an alert and not go to the next screen', async () => {
      const initialState = {
        petitionLink: {
          petitionLink: somePetitionLink,
        },
        authorization: {},
        attributes: {
          list: [],
        },
      };
      const doAuthorizeMock = jest.fn().mockReturnValue(Promise.resolve({ pinCorrect: false }));
      const wrapper = shallow(
        <Home />,
        { context: { store: mockStore(initialState) } },
      );
      const homeComponent = wrapper.dive().instance();
      homeComponent.props = {
        ...homeComponent.props,
        goToPetitionSummary: goToAttributesSummaryMock,
        goQRScannerIntro: goQRScannerIntroMock,
        doAuthorize: doAuthorizeMock,
      };

      await homeComponent.goToNextPage();

      expect(alertMock).toBeCalled();
      expect(goToAttributesSummaryMock).not.toBeCalled();
      expect(goQRScannerIntroMock).not.toBeCalled();
    });
  });

  describe('if the user put the correct pin', () => {
    const doAuthorizeMock = jest.fn().mockReturnValue(Promise.resolve({ pinCorrect: true }));

    it('should call goQRScannerIntro if there is no petitionLink', async () => {
      const initialState = {
        petitionLink: {
          petitionLink: undefined,
        },
        authorization: {},
        attributes: {
          list: [],
        },
      };
      const wrapper = shallow(
        <Home />,
        { context: { store: mockStore(initialState) } },
      );
      const homeComponent = wrapper.dive().instance();
      homeComponent.props = {
        ...homeComponent.props,
        goQRScannerIntro: goQRScannerIntroMock,
        doAuthorize: doAuthorizeMock,
      };

      await homeComponent.goToNextPage();

      expect(goQRScannerIntroMock).toBeCalled();
    });

    it('should call goToAttributesSummary if there is a petitionLink and ', async () => {
      const initialState = {
        petitionLink: {
          petitionLink: somePetitionLink,
        },
        authorization: {},
        attributes: {
          list: [],
        },
      };
      const wrapper = shallow(
        <Home />,
        { context: { store: mockStore(initialState) } },
      );
      const homeComponent = wrapper.dive().instance();
      homeComponent.props = {
        ...homeComponent.props,
        goToAttributesSummary: goToAttributesSummaryMock,
        doAuthorize: doAuthorizeMock,
      };

      await homeComponent.goToNextPage();

      expect(goToAttributesSummaryMock).toBeCalledWith(somePetitionLink);
    });
  });
});
