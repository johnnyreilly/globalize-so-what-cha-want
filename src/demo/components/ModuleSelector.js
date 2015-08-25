import React from 'react/addons';
import Module from './Module';

class ModuleSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modulesState, handleSelectionChange } = this.props;
    const modulesToSelect = Object.keys(modulesState).map(mod => <div className="col-md-4" key={mod}>
        <Module
          moduleName={ mod }
          description={ modulesState[mod].description }
          isSelected={ modulesState[mod].isSelected }
          handleSelectionChange={ handleSelectionChange } />
      </div>);

    return (
      <div className="row">
        { modulesToSelect }
      </div>
    );
  }
}

export default ModuleSelector;
