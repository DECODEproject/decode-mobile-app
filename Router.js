import {
  createRouter,
} from '@expo/ex-navigation';
import Home from './screens/Home';
import QRScannerIntro from './screens/QRScannerIntro';
import QRScanner from './screens/QRScanner';
import Authorisation from './screens/Authorisation';
import PetitionSummaryGet from './screens/PetitionSummaryGet';
import PetitionSummarySign from './screens/PetitionSummarySign';
import SignConfirmation from './screens/SignConfirmation';

const Router = createRouter(() => ({
  home: () => Home,
  QRScannerIntro: () => QRScannerIntro,
  QRScanner: () => QRScanner,
  authorisation: () => Authorisation,
  petitionSummaryGet: () => PetitionSummaryGet,
  petitionSummarySign: () => PetitionSummarySign,
  signConfirmation: () => SignConfirmation,
}));

export default Router;
