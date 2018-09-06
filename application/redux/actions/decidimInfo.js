import urlParse from 'url-parse';
import getInitialUrl from '../../utils/url';
import types from '../actionTypes';

export function setPetitionLink(petitionLink) {
  return {
    type: types.SET_PETITION_LINK,
    petitionLink,
  };
}

export function setDecidimInfo() {
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

export function onStartApp() {
  return (dispatch) => {
    getInitialUrl().then((url) => {
      const myURL = urlParse(url, true);
      const { query: { petitionLink } } = myURL;
      dispatch(setPetitionLink(petitionLink));
    });
  };
}
