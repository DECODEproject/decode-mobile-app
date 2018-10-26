import axios from 'axios';


const request = async (callback, sessionId, attribute) => {
  const data = {
    sessionId,
    attribute: {
      predicate: attribute.predicate,
      object: attribute.object,
      provenance: {
        source: attribute.source,
        credential: attribute.credential,
      },
    },
  };

  let response;

  try {
    response = await axios.post(callback, data);
  } catch (error) {
    return false;
  }

  return response.status === 200;
};

export default request;
