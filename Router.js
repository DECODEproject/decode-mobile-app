import {
  createRouter,
} from '@expo/ex-navigation';
import Home from './screens/Home';
import Authorisation from './screens/Authorisation';

const Router = createRouter(() => ({
  home: () => Home,
  authorisation: () => Authorisation,
}));

export default Router;
