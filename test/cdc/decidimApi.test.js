import callWalletProxy from './someApiCall';

const { Pact } = require('@pact-foundation/pact');

describe('Decidim API', () => {
  const MOCK_SERVER_PORT = 5010;
  const MOCK_SERVER_URL = '127.0.0.1';
  const provider = new Pact({
    consumer: 'Wallet',
    provider: 'DecidimAPI',
    port: MOCK_SERVER_PORT,
    log: 'logs/pact.log',
    dir: 'pacts',
    logLevel: 'INFO',
    spec: 2,
    pactfileWriteMode: 'update',
  });

  const VALID_RESPONSE = {
    petition: {
      id: '2',
      attributes: {
        mandatory: [{
          predicate: 'schema:addressLocality',
          object: 'Barcelona',
          scope: 'can-access',
          credentialIssuer: {
            url: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
          },
        }],
        optional: [],
      },
    },
  };

  describe('Participatory Processes', () => {
    beforeAll((done) => {
      provider
        .setup()
        .then(() => {
          provider.addInteraction({
            state: 'I have a participatory process',
            uponReceiving: 'a request for information of a participatory process',
            withRequest: {
              method: 'GET',
              path: '/participatoryProcess/2',
            },
            willRespondWith: {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
              body: VALID_RESPONSE,
            },
          });
        })
        .then(() => done());
    });

    afterAll((done) => {
      provider
        .finalize()
        .then(() => done());
    });

    it('should return information of valid participatory process', (done) => {
      return callWalletProxy({ host: MOCK_SERVER_URL, port: MOCK_SERVER_PORT })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data.petition.id).toEqual('2');
          done();
        })
        .then(() => provider.verify());
    });
  });
});
