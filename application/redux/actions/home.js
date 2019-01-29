import { goToAttributesSummary, goToError, goToPetitionSummary } from './navigation';
import { getPetition } from './petition';

export default function goToPetition(decidimClient, petitionId) {
  return async (dispatch, getState) => {
    await dispatch(getPetition(decidimClient, petitionId));
    const state = await getState();
    try {
        console.log(`State: ${JSON.stringify(state)}`);
        const {navigation: {currentNavigatorUID, navigators}} = state;
        const {index, routes} = navigators[currentNavigatorUID];
        const routeName = routes[index].routeName;
        console.log("Current route: ", routeName);
        if (routeName === 'petitionSummary') return;
    } catch (e) {
      console.log("Could not establish current route name", e);
    }

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
