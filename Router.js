import {
  createRouter,
} from '@expo/ex-navigation';
import Home from './screens/Home';
import Authorisation from './screens/Authorisation';
import PetitionSummary from './screens/PetitionSummary';
import PetitionSummarySign from './screens/PetitionSummarySign';
import SignConfirmation from './screens/SignConfirmation';

const Router = createRouter(() => ({
  home: () => Home,
  authorisation: () => Authorisation,
  petitionSummary: () => PetitionSummary,
}));

export default Router;
