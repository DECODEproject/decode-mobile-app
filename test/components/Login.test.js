import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import Login, { EmptyLogin, ErrorLogin, SuccessLogin } from '../../screens/Login';
import CredentialList from '../../application/components/CredentialList/CredentialList';
import Attribute from '../../lib/Attribute';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

const existingCredential = new Attribute({
  predicate: 'schema:iotCommunity', object: 'MakingSense', scope: '', provenance: { url: 'https://making-sense.eu/credential-issuer' },
}, 'd4e8471af6492cf80afb6591bbe63f909d8d07a6efbf052b11851e5cd6', '');


describe('Login Screen', () => {
  it('should display Empty Login when there is no credential available', () => {
    const store = mockStore({
      login: {
        credentials: [],
        isComingFromLogin: false,
        success: false,
        failed: false,
      },
    });

    const wrapper = shallow(<Login />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();


    const emptyLoginComponent = wrapper.find(EmptyLogin);
    expect(emptyLoginComponent).toHaveLength(1);
    const credentialListComponent = wrapper.find(CredentialList);
    expect(credentialListComponent).toHaveLength(0);
    const errorComponent = wrapper.find(ErrorLogin);
    expect(errorComponent).toHaveLength(0);
    const successComponent = wrapper.find(SuccessLogin);
    expect(successComponent).toHaveLength(0);
  });

  it('should display CredentialList when there is some credential available', () => {
    const store = mockStore({
      login: {
        credentials: [existingCredential],
        isComingFromLogin: false,
        success: false,
        failed: false,
      },
    });

    const wrapper = shallow(<Login />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();


    const emptyLoginComponent = wrapper.find(EmptyLogin);
    expect(emptyLoginComponent).toHaveLength(0);
    const credentialListComponent = wrapper.find(CredentialList);
    expect(credentialListComponent).toHaveLength(1);
    const errorComponent = wrapper.find(ErrorLogin);
    expect(errorComponent).toHaveLength(0);
    const successComponent = wrapper.find(SuccessLogin);
    expect(successComponent).toHaveLength(0);
  });

  it('should display ErrorLogin when failed request', () => {
    const store = mockStore({
      login: {
        credentials: [existingCredential],
        isComingFromLogin: true,
        success: false,
        failed: true,
      },
    });

    const wrapper = shallow(<Login />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();


    const emptyLoginComponent = wrapper.find(EmptyLogin);
    expect(emptyLoginComponent).toHaveLength(0);
    const credentialListComponent = wrapper.find(CredentialList);
    expect(credentialListComponent).toHaveLength(0);
    const errorComponent = wrapper.find(ErrorLogin);
    expect(errorComponent).toHaveLength(1);
    const successComponent = wrapper.find(SuccessLogin);
    expect(successComponent).toHaveLength(0);
  });

  it('should display SuccessLogin when success request for login', () => {
    const store = mockStore({
      login: {
        credentials: [existingCredential],
        isComingFromLogin: true,
        success: true,
        failed: false,
      },
    });

    const wrapper = shallow(<Login />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();


    const emptyLoginComponent = wrapper.find(EmptyLogin);
    expect(emptyLoginComponent).toHaveLength(0);
    const credentialListComponent = wrapper.find(CredentialList);
    expect(credentialListComponent).toHaveLength(0);
    const errorComponent = wrapper.find(ErrorLogin);
    expect(errorComponent).toHaveLength(0);
    const successComponent = wrapper.find(SuccessLogin);
    expect(successComponent).toHaveLength(1);
  });
});
