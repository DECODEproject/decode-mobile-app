import { Linking } from 'react-native';
import { getDecidimUrl } from '../../config';

export default (petitionId) => {
  const petitionUrl = `${getDecidimUrl()}/processes/digital-democracy-data-commons/f/56/petitions/${petitionId}`;
  Linking.openURL(petitionUrl);
};
