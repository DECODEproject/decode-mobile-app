import { Constants } from 'expo';

const isLocal = Constants.manifest.releaseChannel !== 'production';

const initialState = {
  decidimApi: false,
  zenroom: true,
  enabledDeleteButton: isLocal,
};

export default function reducer(state = initialState) {
  return state;
}
