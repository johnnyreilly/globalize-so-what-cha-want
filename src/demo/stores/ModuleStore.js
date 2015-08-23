import FluxStore from './FluxStore';
import ModuleActionTypes from '../constants/action-types/ModuleActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

let modulesState = {
  currency     : false,
  date         : true,
  message      : false,
  number       : true,
  plural       : false,
  relativeTime : false
};

class ModuleStore extends FluxStore {
  constructor() {
    super();
  }

  getState() {
    return { modulesState };
  }
}

const moduleStoreInstance = new ModuleStore();

moduleStoreInstance.dispatchToken = AppDispatcher.register(_dispatcherHandler);

// TODO: Make this conditional so it only happens in test? - look at envify
moduleStoreInstance._dispatcherHandler = _dispatcherHandler;
moduleStoreInstance._cleanState = _cleanState;

function _cleanState() {
  modulesState = {
    currency     : false,
    date         : true,
    message      : false,
    number       : true,
    plural       : false,
    relativeTime : false
  };
}

function _dispatcherHandler(action) {
  switch(action.type) {
    case ModuleActionTypes.MODULE_CHANGED:
      const { globModule } = action;
      modulesState[globModule] = !modulesState[globModule];
      moduleStoreInstance.emitChange();
      break;
  }
}

export default moduleStoreInstance;
