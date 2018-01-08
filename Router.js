import {
  createRouter,
} from '@expo/ex-navigation';
import Home from './screens/Home';
import Authorisation from './screens/Authorisation';
import PetitionSummaryGet from './screens/PetitionSummaryGet';
import PetitionSummarySign from './screens/PetitionSummarySign';
import SignConfirmation from './screens/SignConfirmation';
import QRScanner from './screens/QRScanner';

const Router = createRouter(() => ({
  home: () => Home,
  authorisation: () => Authorisation,
  petitionSummaryGet: () => PetitionSummaryGet,
  petitionSummarySign: () => PetitionSummarySign,
  signConfirmation: () => SignConfirmation,
  QRScanner: () => QRScanner,
}));

export default Router;
