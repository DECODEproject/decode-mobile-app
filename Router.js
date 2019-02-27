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

import { createRouter } from '@expo/ex-navigation';
import Home from './screens/Home';
import Authorisation from './screens/Authorisation';
import PetitionSummary from './screens/PetitionSummary';
import SignOutcome from './screens/SignOutcome';
import AttributesSummary from './screens/AttributesSummary';
import AttributesLanding from './screens/AttributesLanding';
import AttributesVerification from './screens/AttributesVerification';
import PinSetup from './screens/PinSetup';
import Walkthrough from './screens/Walkthrough';
import ManageAttributes from './screens/ManageAttributes';
import PetitionList from './screens/PetitionList';
import Error from './screens/Error';
import Login from './screens/Login';

const Router = createRouter(() => ({
  home: () => Home,
  walkthrough: () => Walkthrough,
  authorisation: () => Authorisation,
  petitionSummary: () => PetitionSummary,
  attributesSummary: () => AttributesSummary,
  attributesLanding: () => AttributesLanding,
  attributesVerification: () => AttributesVerification,
  signOutcome: () => SignOutcome,
  pinSetup: () => PinSetup,
  manageAttributes: () => ManageAttributes,
  error: () => Error,
  login: () => Login,
  petitionList: () => PetitionList,
}));

export default Router;
