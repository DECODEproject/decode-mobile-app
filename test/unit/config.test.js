import getWalletProxyUrl from '../../config';

describe('getWalletProxyUrl', () => {
  it('should return dev url if passed nothing', () => {
    const walletProxyUrl = getWalletProxyUrl();

    const walletProxyUrlDev = 'http://localhost:5010';

    expect(walletProxyUrl).toEqual(walletProxyUrlDev);
  });

  it('should return prod url if prod environment', () => {
    const walletProxyUrl = getWalletProxyUrl('production');

    const walletProxyUrlProd = 'http://ec2-54-194-123-109.eu-west-1.compute.amazonaws.com';

    expect(walletProxyUrl).toEqual(walletProxyUrlProd);
  });

  it('should return dev url if passed garbage', () => {
    const walletProxyUrl = getWalletProxyUrl('garbage');

    const walletProxyUrlDev = 'http://localhost:5010';

    expect(walletProxyUrl).toEqual(walletProxyUrlDev);
  });
});
