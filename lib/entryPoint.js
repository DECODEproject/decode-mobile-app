import urlParse from 'url-parse';
import getInitialUrl from '../application/utils/url';


export async function isComingFromLogin() {
  return getInitialUrl().then((rawUrl) => {
    const url = urlParse(rawUrl, true);
    const { query: { action } } = url;
    return action === 'login';
  });
}

export async function getLoginParameters() {
  return getInitialUrl().then((rawUrl) => {
    const url = urlParse(rawUrl, true);
    const { query: { callback, sessionId } } = url;
    return { callback, sessionId };
  });
}
