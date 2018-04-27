import urlParse from 'url-parse';
import types from '../actionTypes';

export default function addCredentialFromUrl(attribute, walletId, url) {
  const { query: { credential } } = urlParse(url, true);

  return {
    type: types.ADD_CREDENTIAL_FROM_URL,
    attribute,
    walletId,
    credential,
  };
}
