import { Constants } from 'expo';
import { getWalletProxyUrl, getChainspaceUrl } from '../../config';

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

describe('getChainspaceUrl', () => {
  const originalUri = Constants.linkingUri;
  const chainspaceLocalPort = 5000;

  beforeEach(() => {
    Constants.linkingUri = 'http://someurl.com';
  });

  afterEach(() => {
    Constants.linkingUri = originalUri;
  });

  it('should return url in the current host if passed nothing', () => {
    const chainspaceUrl = getChainspaceUrl();

    const chainspaceUrlDev = `http://someurl.com:${chainspaceLocalPort}`;

    expect(chainspaceUrl).toEqual(chainspaceUrlDev);
  });

  it('should return prod url if prod environment', () => {
    const chainspaceUrl = getChainspaceUrl('production');

    const chainspaceUrlProd = 'http://ec2-34-241-214-92.eu-west-1.compute.amazonaws.com:9090';

    expect(chainspaceUrl).toEqual(chainspaceUrlProd);
  });

  it('should return dev url if passed garbage', () => {
    const chainspaceUrl = getChainspaceUrl('garbage');

    const chainspaceUrlDev = `http://someurl.com:${chainspaceLocalPort}`;

    expect(chainspaceUrl).toEqual(chainspaceUrlDev);
  });
});
