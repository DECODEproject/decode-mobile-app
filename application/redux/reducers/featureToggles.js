import { Constants } from 'expo';

const isLocal = Constants.manifest.releaseChannel !== 'production';

const initialState = {
  login: isLocal,
  genderAttribute: true,
};

export default function reducer(state = initialState) {
  return state;
}
