import AppDispatcher from '../dispatcher/AppDispatcher';
import ModuleActionTypes from '../constants/action-types/ModuleActionTypes';

export function routeChanged(selectedModules: { [moduleName: string]: string }) {
  AppDispatcher.dispatch({
    selectedModules,
    type: ModuleActionTypes.ROUTE_CHANGED
  });
}
