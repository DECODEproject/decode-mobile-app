import { Constants } from 'expo';

const initialState = {
  decidimApi: false,
  zenroom: Constants.manifest.releaseChannel !== 'production',
};

export default function reducer(state = initialState) {
  return state;
}
