import { Constants } from 'expo';

const isLocal = Constants.manifest.releaseChannel !== 'production';

const initialState = {
  enabledDeleteButton: isLocal,
  login: isLocal,
};

export default function reducer(state = initialState) {
  return state;
}
