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
import setDecidimInfo from './decidimInfo';
import { addTranslations } from '../../../i18n';

export default function goToPetition(decidimClient, petitionId, top = true) {
  return async (dispatch, getState) => {
    await dispatch(getPetition(decidimClient, petitionId));
    const state = await getState();
    try {
        const {navigation: {currentNavigatorUID, navigators}, authorization: {authorized}} = state;
        const {index, routes} = navigators[currentNavigatorUID];
        const routeName = routes[index].routeName;
        console.log("Current route: ", routeName);
        if (routeName === 'petitionSummary') return;
        if (routeName === 'home' && !authorized) {
          dispatch(setDecidimInfo(decidimClient.decidimAPIUrl, petitionId));
          return;
        }
    } catch (e) {
      console.log("Could not establish current route name", e);
    }

    const errorGettingPetitionInformation = state.petition.error !== undefined;

    if (errorGettingPetitionInformation) {
      dispatch(goToError(errorGettingPetitionInformation));
    } else {
      const isAttributeVerified = state.attributes.list.has(state.petition.petition.attributes.mandatory[0].predicate);
      addTranslations('schema', 'issuerName', state.petition.petition.attributes.mandatory[0].provenance.issuerName);
      addTranslations('schema', state.petition.petition.attributes.mandatory[0].predicate, state.petition.petition.attributes.mandatory[0].name);
      if (isAttributeVerified) {
        dispatch(goToPetitionSummary(top));
      } else {
        state.petition.petition.attributes.mandatory[0].verificationInput.map(
          field => addTranslations('attributesVerification', field.id, field.name)
        );
        dispatch(goToAttributesSummary(top));
      }
    }
  };
}
