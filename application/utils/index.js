import { Linking } from 'react-native';
import { getDecidimUrl } from '../../config';

export default (petitionId) => {
  const petitionUrl = `${getDecidimUrl()}/processes/main/f/6/petitions/${petitionId}`;
  Linking.openURL(petitionUrl);
};
