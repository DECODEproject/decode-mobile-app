import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import Home from '../../screens/Home';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('validatePinCode', () => {
  const somePetitionLink = 'http://city-counsil.com';
  const alertMock = jest.fn();
  const goToAttributesSummaryMock = jest.fn();
  const goToPetitionSummaryMock = jest.fn();
  const goToAttributesLandingMock = jest.fn();

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
          nonVerified: [],
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
        goToAttributesLanding: goToAttributesLandingMock,
        doAuthorize: doAuthorizeMock,
      };

      await homeComponent.validatePinCode();

      expect(alertMock).toBeCalled();
      expect(goToAttributesSummaryMock).not.toBeCalled();
      expect(goToAttributesLandingMock).not.toBeCalled();
    });
  });

  describe('if the user put the correct pin', () => {
    const doAuthorizeMock = jest.fn().mockReturnValue(Promise.resolve({ pinCorrect: true }));

    it('should call goToAttributesLanding if there is no petitionLink', async () => {
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
        goToAttributesLanding: goToAttributesLandingMock,
        doAuthorize: doAuthorizeMock,
      };

      await homeComponent.validatePinCode();

      expect(goToAttributesLandingMock).toBeCalled();
    });

    it('should call goToAttributesSummary if there is a petitionLink and the required attribute is not verified', async () => {
      const initialState = {
        petitionLink: {
          petitionLink: somePetitionLink,
        },
        authorization: {},
        attributes: {
          nonVerified: [],
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

      await homeComponent.validatePinCode();

      expect(goToAttributesSummaryMock).toBeCalledWith(somePetitionLink);
    });

    it('should call goToPetitionSummary if there is a petitionLink and the required attribute is verified', async () => {
      const initialState = {
        petitionLink: {
          petitionLink: somePetitionLink,
        },
        authorization: {},
        attributes: {
          nonVerified: [{}],
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
        goToPetitionSummary: goToPetitionSummaryMock,
        doAuthorize: doAuthorizeMock,
      };

      await homeComponent.validatePinCode();

      expect(goToPetitionSummaryMock).toBeCalledWith(somePetitionLink);
    });
  });
});
