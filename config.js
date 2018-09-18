import { Constants } from 'expo';
import urlParse from 'url-parse';

export function getWalletProxyUrl(environment) {
  const walletProxyUrl = {
    dev: 'http://localhost:5010',
    production: 'http://ec2-54-194-123-109.eu-west-1.compute.amazonaws.com',
  };
  const hostName = urlParse(Constants.linkingUri, true).hostname;
  walletProxyUrl.dev = walletProxyUrl.dev.replace('localhost', hostName);

  return environment === 'production' ? walletProxyUrl.production : walletProxyUrl.dev;
}

export function getChainspaceUrl(environment) {
  const chainspaceUrl = {
    dev: 'http://localhost:5000',
    production: 'www.fixthisprodurllater.com',
  };

  const hostName = urlParse(Constants.linkingUri, true).hostname;
  chainspaceUrl.dev = chainspaceUrl.dev.replace('localhost', hostName);
  return environment === 'production' ? chainspaceUrl.production : chainspaceUrl.dev;
}
