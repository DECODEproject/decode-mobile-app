import { Constants } from 'expo';
import urlParse from 'url-parse';

export default function getChainspaceUrl(environment) {
  const chainspaceUrl = {
    dev: 'http://localhost:5000',
    production: 'http://ec2-34-241-214-92.eu-west-1.compute.amazonaws.com:9090',
  };

  let hostName = urlParse(Constants.linkingUri, true).hostname;
  if (!hostName) {
      hostName = urlParse(Constants.intentUri, true).hostname;
  }
  chainspaceUrl.dev = chainspaceUrl.dev.replace('localhost', hostName);
  console.log(`Expo Constants: ${JSON.stringify(Constants)}`);
  return environment === 'production' ? chainspaceUrl.production : chainspaceUrl.dev;
}

export function getDecidimUrl() {
  return 'https://betadddc.alabs.org';
}
