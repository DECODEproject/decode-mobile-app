import { Constants } from 'expo';
import getWalletProxyUrl from '../../config';

describe('getWalletProxyUrl', () => {
  const originalUri = Constants.linkingUri;

  beforeEach(() => {
    Constants.linkingUri = 'http://someurl.com';
  });

  afterEach(() => {
    Constants.linkingUri = originalUri;
  });

  it('should return url in the current host if passed nothing', () => {
    const walletProxyUrl = getWalletProxyUrl();

    const walletProxyUrlDev = 'http://someurl.com:5010';

    expect(walletProxyUrl).toEqual(walletProxyUrlDev);
  });

  it('should return prod url if prod environment', () => {
    const walletProxyUrl = getWalletProxyUrl('production');

    const walletProxyUrlProd = 'http://ec2-54-194-123-109.eu-west-1.compute.amazonaws.com';

    expect(walletProxyUrl).toEqual(walletProxyUrlProd);
  });

  it('should return dev url if passed garbage', () => {
    const walletProxyUrl = getWalletProxyUrl('garbage');

    const walletProxyUrlDev = 'http://someurl.com:5010';

    expect(walletProxyUrl).toEqual(walletProxyUrlDev);
  });
});
