
class DecidimClient {
  async fetchPetition(petitionLink, petitionId) { // eslint-disable-line
    let response;
    try {
      const graphQlQuery = `${petitionLink}
        query={
          participatoryProcess(id: ${petitionId}) {
            id
            title {
              translation (locale: "ca")
            }
          }
        }
      `;
      response = await fetch(graphQlQuery);
    } catch (error) {
      return {
        error,
        message: 'Could not retrieve petition details.',
      };
    }

    if (!response.ok) {
      let text = await response.text();
      if (!text) text = 'Unknown error';
      return { error: response.status, message: text };
    }

    const { data } = await response.json();
    const petitionResult = {
      petition: {
        id: data.participatoryProcess.id,
        title: data.participatoryProcess.title.translation,
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

    return petitionResult;
  }
}

export default DecidimClient;

