import { Constants } from 'expo';
import urlParse from 'url-parse';

export default function getChainspaceUrl(environment) {
  const chainspaceUrl = {
    dev: 'http://localhost:5000',
    production: 'http://ec2-34-241-214-92.eu-west-1.compute.amazonaws.com:9090',
  };

  const hostName = urlParse(Constants.linkingUri, true).hostname;
  chainspaceUrl.dev = chainspaceUrl.dev.replace('localhost', hostName);
  return environment === 'production' ? chainspaceUrl.production : chainspaceUrl.dev;
}
