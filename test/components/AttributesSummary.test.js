// import React from 'react';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16/build/index';
// import Button from '../../application/components/Button/Button';
// import AttributesSummary from '../../screens/AttributesSummary';
//
//
// Enzyme.configure({ adapter: new Adapter() });
//
// const mockStore = configureStore([thunk]);
//
// describe('The AttributesSummary page', () => {
//   const somePetitionLink = 'http://some-petition.com';
//   const goToPetitionSummaryMock = jest.fn();
//   const openWebBroswerAsyncMock = jest.fn();
//
//   // it('should show any unverified required attribute for the petition', () => {
//   //
//   // });
//
//
//   // describe('when the verify button is pressed', () => {
//   //   it('should go to credential issuer', () => {
//   //     const initialState = {
//   //       petitionLink: {
//   //         petitionLink: somePetitionLink,
//   //       },
//   //       petition: {
//   //         petition: {
//   //           title: 'hello',
//   //           description: 'world',
//   //           closingDate: 'today',
//   //           id: '1234',
//   //           isEthereum: 'false',
//   //         },
//   //       },
//   //       wallet: {
//   //         id: 'something',
//   //       },
//   //       authorization: {},
//   //     };
//   //
//   //     const wrapper = shallow(
//   //       <AttributesSummary />,
//   //       { context: { store: mockStore(initialState) } },
//   //     );
//   //
//   //     // wrapper.dive().find(Button).first().simulate('click');
//   //
//   //     const spy = jest.spyOn(wrapper.instance(), 'openWebBrowserAsync');
//   //     wrapper.update();
//   //     wrapper.find(Button).simulate('click');
//   //     expect(spy).toHaveBeenCalled();
//   //   });
//   // });
//
//   // describe('on redirect from credential issuer', () => {
//   //   it('should go to petitionSummary page', () => {
//   //     const initialState = {
//   //       petitionLink: {
//   //         petitionLink: somePetitionLink,
//   //       },
//   //       petition: {
//   //         petition: {
//   //           title: 'hello',
//   //           description: 'world',
//   //           closingDate: 'today',
//   //           id: '1234',
//   //           isEthereum: 'false',
//   //         },
//   //       },
//   //       wallet: {
//   //         id: 'something',
//   //       },
//   //       authorization: {},
//   //     };
//   //
//   //     const wrapper = shallow(
//   //       <AttributesSummary />,
//   //       { context: { store: mockStore(initialState) } },
//   //     );
//   //
//   //     const attributesSummaryComponent = wrapper.dive().instance();
//   //     attributesSummaryComponent.props = {
//   //       ...attributesSummaryComponent.props,
//   //       goToPetitionSummary: goToPetitionSummaryMock,
//   //     };
//   //
//   //     wrapper.dive().find(Button).first().simulate('click');
//   //
//   //     expect(goToPetitionSummaryMock).toBeCalledWith(somePetitionLink);
//   //   });
//   // });
// });
