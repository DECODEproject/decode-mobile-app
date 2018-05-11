import { createRouter } from '@expo/ex-navigation';
import Home from './screens/Home';
import QRScannerIntro from './screens/QRScannerIntro';
import QRScanner from './screens/QRScanner';
import Authorisation from './screens/Authorisation';
import PetitionSummary from './screens/PetitionSummary';
import SignOutcome from './screens/SignOutcome';

const Router = createRouter(() => ({
  home: () => Home,
  QRScannerIntro: () => QRScannerIntro,
  QRScanner: () => QRScanner,
  authorisation: () => Authorisation,
  petitionSummary: () => PetitionSummary,
  signOutcome: () => SignOutcome,
}));

export default Router;
