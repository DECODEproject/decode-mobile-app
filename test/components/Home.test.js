import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import Home from '../../screens/Home';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('validatePinCode', () => {
  const alertMock = jest.fn();
  const goToAttributesSummaryMock = jest.fn();
  const goToAttributesLandingMock = jest.fn();
  const decidimClientMock = jest.fn();
  const goToPetitionMock = jest.fn();
  const petitionId = '123';
  const defaultState = {
    decidimInfo: {
      decidimAPIUrl: 'decidim.com',
      petitionId,
    },
    petition: {
      error: undefined,
    },
    authorization: {},
    attributes: {
      list: new Map([['schema:addressLocality', {}]]),
    },
    featureToggles: {
      login: true,
    },
    login: {
      credentials: [],
      isComingFromLogin: false,
    },
  };

  beforeEach(() => {
    global.alert = alertMock;
  });

  afterEach(() => {
    global.alert = undefined;
  });

  describe('if the user puts the incorrect pin', () => {
    it('should show an alert and not go to the next screen', async () => {
      const doAuthorizeMock = jest.fn().mockReturnValue(Promise.resolve({ pinCorrect: false }));
      const wrapper = shallow(<Home />)
        .first().shallow()
        .first()
        .shallow({ context: { store: mockStore(defaultState) } });

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

  describe('if the user puts the correct pin', () => {
    const doAuthorizeMock = jest.fn().mockReturnValue(Promise.resolve({ pinCorrect: true }));

    describe('if there is no decidimApiUrl', () => {
      it('should call goToAttributesLanding', async () => {
        const initialState = {
          ...defaultState,
          decidimInfo: {
            decidimAPIUrl: undefined,
          },
        };
        const wrapper = shallow(<Home />)
          .first().shallow()
          .first()
          .shallow({ context: { store: mockStore(initialState) } });

        const homeComponent = wrapper.dive().instance();
        homeComponent.props = {
          ...homeComponent.props,
          goToAttributesLanding: goToAttributesLandingMock,
          doAuthorize: doAuthorizeMock,
        };

        await homeComponent.validatePinCode();

        expect(goToAttributesLandingMock).toBeCalled();
      });
    });

    describe('if there is decidimApiUrl', () => {
      it('should call goToPetition', () => {
        const initialState = {
          ...defaultState,
          decidimInfo: {
            decidimAPIUrl: 'decidim.com',
            petitionId,
          },
          attributes: {
            list: new Map(),
          },
        };

        const wrapper = shallow(<Home />)
          .first().shallow()
          .first()
          .shallow({ context: { store: mockStore(initialState) } });

        const homeComponent = wrapper.dive().instance();
        homeComponent.props = {
          ...homeComponent.props,
          decidimClient: decidimClientMock,
          goToPetition: goToPetitionMock,
          doAuthorize: doAuthorizeMock,
        };

        return homeComponent.validatePinCode().then(() => {
          expect(goToPetitionMock).toBeCalled();
        });
      });
    });

    describe('if is coming from login', () => {
      it('should go to Login screen', () => {
        const initialState = {
          ...defaultState,
          login: {
            credentials: [],
            isComingFromLogin: true,
          },
        };

        const goToLogin = jest.fn();

        const wrapper = shallow(<Home />)
          .first().shallow()
          .first()
          .shallow({ context: { store: mockStore(initialState) } });

        const homeComponent = wrapper.dive().instance();
        homeComponent.props = {
          ...homeComponent.props,
          doAuthorize: doAuthorizeMock,
          goToLogin,
        };

        return homeComponent.validatePinCode().then(() => {
          expect(goToLogin).toBeCalled();
        });
      });
    });
  });
});
