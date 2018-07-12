import { createRouter } from '@expo/ex-navigation';
import Home from './screens/Home';
import QRScanner from './screens/QRScanner';
import Authorisation from './screens/Authorisation';
import PetitionSummary from './screens/PetitionSummary';
import SignOutcome from './screens/SignOutcome';
import AttributesSummary from './screens/AttributesSummary';
import AttributesLanding from './screens/AttributesLanding';

const Router = createRouter(() => ({
  home: () => Home,
  QRScanner: () => QRScanner,
  authorisation: () => Authorisation,
  petitionSummary: () => PetitionSummary,
  attributesSummary: () => AttributesSummary,
  attributesLanding: () => AttributesLanding,
  signOutcome: () => SignOutcome,
}));

export default Router;
