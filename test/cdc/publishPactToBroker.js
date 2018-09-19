const pact = require('@pact-foundation/pact-node');

const opts = {
  providerBaseUrl: '',
  pactFilesOrDirs: ['/Users/elisa/Documents/projects/decode/wallet/pacts/wallet-decidimapi.json'],
  pactBroker: 'https://thoughtworks6.pact.dius.com.au',
  pactBrokerUsername: 'cCoJdaXGUXUUDnraOIjoo6U926lhatU',
  pactBrokerPassword: 'ZYtHusBkkSboThSTVRAw3lcz52tiQ',
  consumerVersion: '0.0.1',
};

pact.publishPacts(opts).then(() => {
  console.log('Publishing pact successful');
}).catch(() => {
  console.log('Publishing failed');
});
