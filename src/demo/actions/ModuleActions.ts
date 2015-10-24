import AppDispatcher from '../dispatcher/AppDispatcher';
import ModuleActionTypes from '../constants/action-types/ModuleActionTypes';

export function moduleChanged(globModule) {
  AppDispatcher.dispatch({
    globModule,
    type: ModuleActionTypes.MODULE_CHANGED,
  });
}
