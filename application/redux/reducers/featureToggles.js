import { Constants } from 'expo';

const isLocal = Constants.manifest.releaseChannel !== 'production';

const initialState = {
  enabledDeleteButton: true,
  login: isLocal,
  genderAttribute: isLocal,
};

export default function reducer(state = initialState) {
  return state;
}
