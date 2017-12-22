import {
  createRouter,
} from '@expo/ex-navigation';
import Home from './screens/Home';
import Authorisation from './screens/Authorisation';
import PetitionSummaryGet from './screens/PetitionSummaryGet';
import PetitionSummarySign from './screens/PetitionSummarySign';
import SignConfirmation from './screens/SignConfirmation';

const Router = createRouter(() => ({
  home: () => Home,
  authorisation: () => Authorisation,
  petitionSummaryGet: () => PetitionSummaryGet,
  petitionSummarySign: () => PetitionSummarySign,
  signConfirmation: () => SignConfirmation,
}));

export default Router;
