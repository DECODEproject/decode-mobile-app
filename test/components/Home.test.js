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
  const goToErrorMock = jest.fn();
  const getPetitionMock = jest.fn();
  const decidimClientMock = jest.fn();
  const petitionId = '40';
  const defaultState = {
    petitionLink: {
      petitionLink: somePetitionLink,
      decidimAPIUrl: 'decidim.com',
    },
    petition: {
      error: undefined,
    },
    authorization: {},
    attributes: {
      list: new Map([['schema:addressLocality', {}]]),
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

  describe('if the user put the correct pin', () => {
    const doAuthorizeMock = jest.fn().mockReturnValue(Promise.resolve({ pinCorrect: true }));

    it('should call goToAttributesLanding if there is no petitionLink', async () => {
      const initialState = {
        ...defaultState,
        petitionLink: {
          petitionLink: undefined,
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

    it('should call goToAttributesSummary if there is a petitionLink and the required attribute is not verified', async () => {
      const initialState = {
        ...defaultState,
        petitionLink: {
          petitionLink: somePetitionLink,
          decidimAPIUrl: 'decidim.com',
        },
        attributes: {
          list: new Map(),
        },
      };
      getPetitionMock.mockReturnValue(Promise.resolve(undefined));

      const wrapper = shallow(<Home />)
        .first().shallow()
        .first()
        .shallow({ context: { store: mockStore(initialState) } });

      const homeComponent = wrapper.dive().instance();
      homeComponent.props = {
        ...homeComponent.props,
        decidimClient: decidimClientMock,
        getPetition: getPetitionMock,
        goToAttributesSummary: goToAttributesSummaryMock,
        doAuthorize: doAuthorizeMock,
      };

      return homeComponent.validatePinCode().then(() => {
        expect(getPetitionMock).toBeCalledWith(
          decidimClientMock,
          initialState.petitionLink.petitionLink,
          initialState.petitionLink.decidimAPIUrl,
          petitionId,
        );
        expect(goToAttributesSummaryMock).toBeCalled();
      });
    });

    it('should call goToPetitionSummary if there is a petitionLink and the required attribute is verified', async () => {
      const initialState = {
        ...defaultState,
        petitionLink: {
          petitionLink: somePetitionLink,
          decidimAPIUrl: 'decidim.com',
        },
        attributes: {
          list: new Map([['schema:addressLocality', {}]]),
        },
      };
      getPetitionMock.mockReturnValue(Promise.resolve(undefined));


      const wrapper = shallow(<Home />)
        .first().shallow()
        .first()
        .shallow({ context: { store: mockStore(initialState) } });

      const homeComponent = wrapper.dive().instance();
      homeComponent.props = {
        ...homeComponent.props,
        decidimClient: decidimClientMock,
        getPetition: getPetitionMock,
        goToPetitionSummary: goToPetitionSummaryMock,
        doAuthorize: doAuthorizeMock,
      };

      return homeComponent.validatePinCode().then(() => {
        expect(getPetitionMock).toBeCalledWith(
          decidimClientMock,
          initialState.petitionLink.petitionLink,
          initialState.petitionLink.decidimAPIUrl,
          petitionId,
        );
        expect(goToPetitionSummaryMock).toBeCalled();
      });
    });

    it('should call goToError if decidimAPi returns fetch petition error', async () => {
      const initialState = {
        ...defaultState,
        petition: {
          error: 'Could not find petition',
        },
      };

      getPetitionMock.mockReturnValue(Promise.resolve(undefined));
      const errorTitle = 'No se ha podido conseguir la información de la petición de Decidim';
      const errorText = 'You can return to the Decidim site to view other active petitions.';


      const wrapper = shallow(<Home />)
        .first().shallow()
        .first()
        .shallow({ context: { store: mockStore(initialState) } });


      const homeComponent = wrapper.dive().instance();
      homeComponent.props = {
        ...homeComponent.props,
        decidimClient: decidimClientMock,
        getPetition: getPetitionMock,
        goToError: goToErrorMock,
        doAuthorize: doAuthorizeMock,
        t: key => ({
          errorTitle,
          errorText,
        }[key]),
      };

      return homeComponent.validatePinCode().then(() => {
        expect(getPetitionMock).toBeCalledWith(
          decidimClientMock,
          initialState.petitionLink.petitionLink,
          initialState.petitionLink.decidimAPIUrl,
          petitionId,
        );
        expect(goToErrorMock).toBeCalledWith(errorTitle, errorText);
      });
    });
  });
});
