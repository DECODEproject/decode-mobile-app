import { Constants } from 'expo';

const isLocal = Constants.manifest.releaseChannel !== 'production';

const initialState = {
  enabledDeleteButton: true,
  login: isLocal,
  genderAttribute: true,
};

export default function reducer(state = initialState) {
  return state;
}
