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
}));

export default Router;
