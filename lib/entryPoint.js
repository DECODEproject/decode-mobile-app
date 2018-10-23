import urlParse from 'url-parse';
import getInitialUrl from '../application/utils/url';


export default async function isComingFromLogin() {
  return getInitialUrl().then((rawUrl) => {
    const url = urlParse(rawUrl);
    return url.hostname === 'login';
  });
}
