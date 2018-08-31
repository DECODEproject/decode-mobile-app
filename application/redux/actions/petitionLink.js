import urlParse from 'url-parse';
import getInitialUrl from '../../utils/url';

export function setPetitionLink(petitionLink) {
  return {
    type: 'SET_PETITION_LINK',
    petitionLink,
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
