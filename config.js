export default function getWalletProxyUrl(environment) {
  const walletProxyUrl = {
    dev: 'http://localhost:5010',
    production: 'http://ec2-54-194-123-109.eu-west-1.compute.amazonaws.com',
  };

  return environment === 'production' ? walletProxyUrl.production : walletProxyUrl.dev;
}
