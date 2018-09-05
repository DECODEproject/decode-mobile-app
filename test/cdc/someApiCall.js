import axios from 'axios';

export default (endpoint) => {
  const { host, port } = endpoint;

  const apiEndpoint = `http://${host}:${port}/participatoryProcess/2`;
  return axios.get(apiEndpoint);
};
