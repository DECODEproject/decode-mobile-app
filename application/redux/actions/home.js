/*
 * DECODE App – A mobile app to control your personal data
 * Copyright (C) 2019 – Thoughtworks Ltd.
 * Copyright (C) 2019 – DRIBIA Data Research S.L.
 *
 * DECODE App is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DECODE App is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * email: ula@dribia.com
 */

import { goToAttributesSummary, goToError, goToPetitionSummary } from './navigation';
import { getPetition } from './petition';
import { addTranslation, getLanguage } from '../../../i18n';

export default function goToPetition(decidimClient, petitionId, top = true) {
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
      dispatch(goToError(errorGettingPetitionInformation));
    } else {
      const isAttributeVerified = state.attributes.list.has('schema:addressLocality');
      if (isAttributeVerified) {
        dispatch(goToPetitionSummary(top));
      } else {
        state.petition.petition.attributes.mandatory[0].verificationInput.map(
          field => addTranslation(getLanguage(), 'attributesVerification', field.name.en, field.name[getLanguage()])
        );
        dispatch(goToAttributesSummary(top));
      }
    }
  };
}
