import {Linking} from "react-native";
import urlParse from 'url-parse';

export function setPetitionLink(petitionLink) {
  return {
    type: 'SET_PETITION_LINK',
    petitionLink,
  }
}

export function onStartApp() {
  return (dispatch) => {
    Linking.getInitialURL().then((url) => {
      const myURL = urlParse(url, true);
      const petitionLink = myURL.query.petitionLink;
      dispatch(setPetitionLink(petitionLink));
    });
  }
}