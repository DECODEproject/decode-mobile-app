import { Linking } from 'react-native';

export default (petitionId) => {
  const petitionUrl = `http://secure-petitions.s3-website-eu-west-1.amazonaws.com/#/${petitionId}`;
  Linking.openURL(petitionUrl);
};
