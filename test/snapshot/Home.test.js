import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import Home from '../../screens/Home';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

const initialState = {
  petitionLink: {
    petitionLink: undefined,
  },
};


it('renders Home component', () => {
  const wrapper = shallow(
    <Home />,
    { context: { store: mockStore(initialState) } },
  );
  expect(wrapper.dive()).toMatchSnapshot();
});

describe('goToNextPage', () => {
  it('should call goQRScannerIntro if there is no petitionLink', () => {
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
});
