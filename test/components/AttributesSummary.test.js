import React from 'react';
import configureStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build/index';
import LinkButton from '../../application/components/LinkButton/LinkButton';
import RequesterInfo from '../../application/components/RequesterInfo/RequesterInfo';
import AttributesSummary from '../../screens/AttributesSummary';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('AttributesSummary', () => {
  const goToPetitionSummaryMock = jest.fn();
  const initialState = {
    decidimInfo: {
      decidimAPIUrl: 'http://decidim.api.com',
    },
    petition: {
      petitionAttributes: [],
      petition: {
        id: '2',
        title: 'title',
        description: 'a'.repeat(150),
        attributes: {
          mandatory: [
            {
              scope: 'can-access',
              object: 'Barcelona',
              predicate: 'schema:addressLocality',
              provenance: {
                url: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
              },
            },
          ],
        },
      },
    },
    attributes: {
      list: new Map(),
    },
    wallet: {
      id: 'something',
    },
  };

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('the page', () => {
    it('should show the verify button', () => {
      const store = mockStore(initialState);

      const wrapper = shallow(<AttributesSummary />)
        .first().shallow()
        .first()
        .shallow({ context: { store } });

      const linkWrapper = wrapper.dive().find(LinkButton);

      expect(linkWrapper).toHaveLength(1);
      expect(linkWrapper.prop('name')).toEqual('Verificar');
    });

    it('should show the requester information of the petition', () => {
      const state = {
        ...initialState,
        petition: {
          petition: {
            title: 'title',
            description: 'a'.repeat(150),
            closingDate: 'today',
            id: '1234',
            attributes: {
              mandatory: [
                {
                  scope: 'can-access',
                  object: 'Barcelona',
                  predicate: 'schema:addressLocality',
                  provenance: {
                    url: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
                  },
                },
              ],
            },
          },
          petitionAttributes: [],
        },
      };
      const store = mockStore(state);

      const wrapper = shallow(<AttributesSummary />)
        .first().shallow()
        .first()
        .shallow({ context: { store } });

      const RequesterInfoWrapper = wrapper.dive().find(RequesterInfo);
      expect(RequesterInfoWrapper).toHaveLength(1);
    });

    describe('when the verify button is pressed', () => {
      xit('should go to credential issuer', () => {
        const wrapper = shallow(<AttributesSummary />)
          .first().shallow()
          .first()
          .shallow({ context: { store: mockStore(initialState) } });

        const spy = jest.spyOn(wrapper.instance(), 'openWebBrowserAsync');
        wrapper.update();
        wrapper.find(LinkButton).simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('on redirect from credential issuer', () => {
      xit('should go to petitionSummary page', () => {
        const wrapper = shallow(<AttributesSummary />)
          .first().shallow()
          .first()
          .shallow({ context: { store: mockStore(initialState) } });

        const attributesSummaryComponent = wrapper.dive().instance();
        attributesSummaryComponent.props = {
          ...attributesSummaryComponent.props,
          goToPetitionSummary: goToPetitionSummaryMock,
        };

        wrapper.dive().find(LinkButton).first().simulate('click');

        expect(goToPetitionSummaryMock).toBeCalled();
      });
    });
  });

  describe('handleRedirect', () => {
    it('should add new attribute with credential', async () => {
      const someUrl = 'blah.com';
      const someEvent = {
        url: someUrl,
      };
      const addCredentialMock = jest.fn();
      const someWalletId = '123';
      const residencyAttribute = {};
      const somePetition = {
        id: '2',
        title: 'title',
        description: 'a'.repeat(150),
        attributes: {
          mandatory: [residencyAttribute],
          optional: [],
        },
      };
      const wrapper = shallow(<AttributesSummary />)
        .first().shallow()
        .first()
        .shallow({ context: { store: mockStore(initialState) } });

      const attributesSummaryComponent = wrapper.dive().instance();
      attributesSummaryComponent.props = {
        ...attributesSummaryComponent.props,
        petition: somePetition,
        walletId: someWalletId,
        goToPetitionSummary: goToPetitionSummaryMock,
        addCredential: addCredentialMock,
      };

      await attributesSummaryComponent.handleRedirect(someEvent);

      expect(addCredentialMock).toBeCalledWith(residencyAttribute, someWalletId, someUrl);
      expect(goToPetitionSummaryMock).toBeCalled();
    });
  });
});
