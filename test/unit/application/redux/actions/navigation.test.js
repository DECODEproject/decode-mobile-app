import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { goToPilotScreen, goToNewAttributes } from '../../../../../application/redux/actions/navigation';

const mockStore = configureMockStore([thunk]);

describe('navigation actions', () => {
  describe('goToPilot', () => {
    it('should go to decidm pilot if there is a link', () => {
      const store = mockStore({
        decidimInfo: {
          decidimAPIUrl: 'dicidim-url',
        },
        petition: {
          petition: {
            id: '40',
          },
        },
        navigation: {},
      });
      store.dispatch(goToPilotScreen());

      const action = store.getActions()[0];
      expect(action.child.routeName).toEqual('attributesSummary');
    });

    it('should go to landing page if there is no link', () => {
      const store = mockStore({
        decidimInfo: {
          decidimAPIUrl: undefined,
        },
        navigation: {},
      });
      store.dispatch(goToPilotScreen());

      const action = store.getActions()[0];
      expect(action.child.routeName).toEqual('attributesLanding');
    });

    it('should go to "New attributes" page when goToNewAttributes action', () => {
      const store = mockStore({
        navigation: {},
      });
      store.dispatch(goToNewAttributes());

      const action = store.getActions()[0];
      expect(action.child.routeName).toEqual('manageAttributes');
    });
  });
});
