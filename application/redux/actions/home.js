import { goToAttributesSummary, goToError, goToPetitionSummary } from './navigation';
import { getPetition } from './petition';
import { addTranslation, getLanguage } from '../../../i18n';

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
        state.petition.petition.attributes.mandatory[0].verificationInput.map(
          field => addTranslation(getLanguage(), 'attributesVerification', field.name.en, field.name[getLanguage()])
        );
        dispatch(goToAttributesSummary());
      }
    }
  };
}
