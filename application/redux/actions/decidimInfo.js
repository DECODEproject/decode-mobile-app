import urlParse from 'url-parse';
import getInitialUrl from '../../utils/url';
import types from '../actionTypes';

export default function setDecidimInfo() {
  return (dispatch) => {
    getInitialUrl().then((url) => {
      const myURL = urlParse(url, true);
      const { query: { decidimAPIUrl, petitionId } } = myURL;
      dispatch({
        type: types.SET_DECIDIM_INFO,
        decidimAPIUrl,
        petitionId,
      });
    });
  };
}
