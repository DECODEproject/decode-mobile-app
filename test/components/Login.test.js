import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import Login, { EmptyLogin } from '../../screens/Login';
import CredentialList from '../../application/components/CredentialList/CredentialList';
import Attribute from '../../lib/Attribute';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore([thunk]);

describe('Login Screen', () => {
  it('should display Empty Login when there is no credential available', () => {
    const store = mockStore({
      login: {
        credentials: [],
        isComingFromLogin: false,
      },
    });

    const wrapper = shallow(<Login />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();


    const emptyStateText = wrapper.find(EmptyLogin);
    expect(emptyStateText).toHaveLength(1);
  });

  it('should display CredentialList when there is some credential available', () => {
    const existingCredential = new Attribute({
      predicate: 'schema:iotCommunity', object: 'MakingSense', scope: '', provenance: { url: 'https://making-sense.eu/credential-issuer' },
    }, 'd4e8471af6492cf80afb6591bbe63f909d8d07a6efbf052b11851e5cd6', '');

    const store = mockStore({
      login: {
        credentials: [existingCredential],
        isComingFromLogin: false,
      },
    });

    const wrapper = shallow(<Login />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();


    const credentialListComponent = wrapper.find(CredentialList);
    expect(credentialListComponent).toHaveLength(1);
  });
});
