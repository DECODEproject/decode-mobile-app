import { Constants } from 'expo';
import urlParse from 'url-parse';

export default function getWalletProxyUrl(environment) {
  const walletProxyUrl = {
    dev: 'http://localhost:5010',
    production: 'http://ec2-54-194-123-109.eu-west-1.compute.amazonaws.com',
  };
  const hostName = urlParse(Constants.linkingUri, true).hostname;
  walletProxyUrl.dev = walletProxyUrl.dev.replace('localhost', hostName);

  return environment === 'production' ? walletProxyUrl.production : walletProxyUrl.dev;
}
