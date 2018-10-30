import { goToAttributesSummary, goToError, goToPetitionSummary } from './navigation';
import { getPetition } from './petition';

export default function goToPetition(decidimClient, petitionId) {
  return async (dispatch, getState) => {
    await dispatch(getPetition(decidimClient, petitionId));
    const state = await getState();
    const errorGettingPetitionInformation = state.petition.petitionError !== undefined;

    if (errorGettingPetitionInformation) {
      dispatch(goToError());
    } else {
      const isAttributeVerified = state.attributes.list.has('schema:addressLocality');
      if (isAttributeVerified) {
        dispatch(goToPetitionSummary());
      } else {
        dispatch(goToAttributesSummary());
      }
    }
  };
}
