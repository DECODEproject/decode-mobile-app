import axios from 'axios';
import loginRequest from '../../../lib/LoginClient';
import Attribute from '../../../lib/Attribute';

jest.mock('axios');

describe('Login request', () => {
  const someSessionId = '9876';
  const someCallback = 'http://bcnnow.decodeproject.eu/wallet-login';
  const credential = new Attribute({
    predicate: 'schema:iotCommunity', object: 'MakingSense', scope: '', provenance: { url: 'https://making-sense.eu/credential-issuer' },
  }, 'd4e8471af6492cf80afb6591bbe63f909d8d07a6efbf052b11851e5cd6', '');

  it('should return true of the post to dashboard is successful', () => {
    axios.post.mockResolvedValue({ status: 200, data: [] });

    return loginRequest(someCallback, someSessionId, credential).then((response) => {
      expect(axios.post).toBeCalledWith(someCallback, {
        sessionId: someSessionId,
        attribute: {
          predicate: 'schema:iotCommunity',
          object: 'MakingSense',
          provenance: {
            source: 'https://making-sense.eu/credential-issuer',
            credential: 'd4e8471af6492cf80afb6591bbe63f909d8d07a6efbf052b11851e5cd6',
          },
        },
      });
      expect(response).toEqual(true);
    });
  });

  it('should return false if the post returns a 500 code', () => {
    axios.post.mockResolvedValue({ status: 500 });

    return loginRequest(someCallback, someSessionId, credential).then((response) => {
      expect(axios.post).toBeCalledWith(someCallback, {
        sessionId: someSessionId,
        attribute: {
          predicate: 'schema:iotCommunity',
          object: 'MakingSense',
          provenance: {
            source: 'https://making-sense.eu/credential-issuer',
            credential: 'd4e8471af6492cf80afb6591bbe63f909d8d07a6efbf052b11851e5cd6',
          },
        },
      });
      expect(response).toEqual(false);
    });
  });

  it('should return false if the post returns a 500 code', () => {
    axios.post.mockRejectedValue(new Error());

    return loginRequest(someCallback, someSessionId, credential).then((response) => {
      expect(response).toEqual(false);
    });
  });
});
