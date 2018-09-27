import { Constants } from 'expo';

const isLocal = Constants.manifest.releaseChannel !== 'production';

const initialState = {
  decidimApi: false,
  zenroom: isLocal,
  enabledDeleteButton: isLocal,
};

export default function reducer(state = initialState) {
  return state;
}
