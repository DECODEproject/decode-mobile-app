import { isComingFromLogin, getLoginParameters } from '../../../lib/entryPoint';
import * as urlModule from '../../../application/utils/url';

describe('isComingFromLogin', () => {
  const nonLoginUrl = 'exp://localhost:19000/signout?action=blah';
  const loginUrl = 'decodewallet://login?header={predicate:”schema:iotCommunity”}&sessionId=9876&callback=http://bcnnow.decodeproject.eu/wallet-login&action=login';

  it('should return false if current url\'s query does not have action=login', async () => {
    urlModule.default = jest.fn().mockReturnValue(Promise.resolve(nonLoginUrl));

    const result = await isComingFromLogin();
    expect(result).toEqual(false);
  });

  it('should return true if current url has a query action=login', async () => {
    urlModule.default = jest.fn().mockReturnValue(Promise.resolve(loginUrl));

    const result = await isComingFromLogin();
    expect(result).toEqual(true);
  });
});

describe('getLoginParameters', () => {
  const loginUrl = 'decodewallet://login?callback=http://bcnnow.decodeproject.eu/wallet-login&sessionId=9876&';
  const nonLoginUrl = 'exp://localhost:19000/signout?action=blah';

  it('should return session and callback from the query parameters if it exists', async () => {
    urlModule.default = jest.fn().mockReturnValue(Promise.resolve(loginUrl));

    const result = await getLoginParameters();

    expect(result).toEqual({
      callback: 'http://bcnnow.decodeproject.eu/wallet-login',
      sessionId: '9876',
    });
  });

  it('should return undefined from the query parameters if it not exists', async () => {
    urlModule.default = jest.fn().mockReturnValue(Promise.resolve(nonLoginUrl));

    const result = await getLoginParameters();

    expect(result).toEqual({ callback: undefined, sessionId: undefined });
  });
});
