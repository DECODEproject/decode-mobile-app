import axios from 'axios';

const request = async (callback, sessionId, attribute, fail=false) => {
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

  try {
    console.log("Callback: ", callback);
    // const response = await axios.post(callback, data);
    // console.log("Response from login: ", response);
    // return response.status === 200;
    return !fail;
  } catch (error) {
    console.log("Error from login: ", error);
    return false;
  }
};

export default request;
