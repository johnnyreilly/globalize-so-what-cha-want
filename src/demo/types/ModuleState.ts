import ModuleDetails from './ModuleDetails';

interface ModulesState {
  [index: string]: ModuleDetails;
  
  currency     : ModuleDetails;
  date         : ModuleDetails;
  message      : ModuleDetails;
  number       : ModuleDetails;
  plural       : ModuleDetails;
  relativeTime : ModuleDetails;
  unit         : ModuleDetails;
}

export default ModulesState;
