import { createRouter } from '@expo/ex-navigation';
import Home from './screens/Home';
import QRScannerIntro from './screens/QRScannerIntro';
import QRScanner from './screens/QRScanner';
import Authorisation from './screens/Authorisation';
import PetitionSummary from './screens/PetitionSummary';
import SignConfirmation from './screens/SignConfirmation';

const Router = createRouter(() => ({
  home: () => Home,
  QRScannerIntro: () => QRScannerIntro,
  QRScanner: () => QRScanner,
  authorisation: () => Authorisation,
  petitionSummary: () => PetitionSummary,
  signConfirmation: () => SignConfirmation,
}));

export default Router;
