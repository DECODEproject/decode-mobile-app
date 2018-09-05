import callWalletProxy from './someApiCall';

describe('Decidim API', () => {
  const MOCK_SERVER_URL = '127.0.0.1';

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
      global.provider.addInteraction({
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
      })
        .then(() => done());
    });

    it('should return information of valid participatory process', done => callWalletProxy({ host: MOCK_SERVER_URL, port: global.port })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data.petition.id).toEqual('2');
        done();
      }));
  });
});
