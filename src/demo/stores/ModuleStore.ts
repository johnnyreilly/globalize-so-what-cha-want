import FluxStore from './FluxStore';
import ModuleActionTypes from '../constants/action-types/ModuleActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ModulesState from '../types/ModuleState';
let modulesState = _getNewState();

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

function _getNewState(): ModulesState {
  return {
    currency     : { isSelected: false, description: 'Currency module provides currency formatting and parsing' },
    date         : { isSelected: false, description: 'Date module provides date formatting and parsing' },
    message      : { isSelected: false, description: 'Message module provides ICU message format support' },
    number       : { isSelected: false, description: 'Number module provides number formatting and parsing' },
    plural       : { isSelected: false, description: 'Plural module provides pluralization support' },
    relativeTime : { isSelected: false, description: 'Relative time module provides relative time formatting support' },
    unit         : { isSelected: false, description: 'Unit module provides unit formatting support' }
  };
}

function _cleanState() {
  modulesState = _getNewState();
}

function _dispatcherHandler(action) {
  switch(action.type) {
    case ModuleActionTypes.MODULE_CHANGED:
      const { globModule } = action;
      modulesState[globModule].isSelected = !modulesState[globModule].isSelected;
      moduleStoreInstance.emitChange();
      break;
    case ModuleActionTypes.ROUTE_CHANGED:
      const { selectedModules } = action;
      const before = JSON.stringify(modulesState);
      Object.keys(selectedModules as { [moduleName: string]: string })
        .forEach(m => modulesState[m].isSelected = selectedModules[m] === 'true');
      const after = JSON.stringify(modulesState);
      if (before !== after) {
        moduleStoreInstance.emitChange();
      }
      break;
  }
}

export default moduleStoreInstance;
