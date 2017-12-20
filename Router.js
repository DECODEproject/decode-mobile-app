import {
  createRouter,
} from '@expo/ex-navigation';
import Home from './screens/Home';
import Placeholder from './screens/Placeholder';

const Router = createRouter(() => ({
  home: () => Home,
  placeholder: () => Placeholder,
}));

export default Router;
