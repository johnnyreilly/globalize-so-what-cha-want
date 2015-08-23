import React from 'react/addons';
import ModuleStore from '../stores/ModuleStore';
import Module from './Module';
import * as ModuleActions from '../actions/ModuleActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._handleSelectionChange = this._handleSelectionChange.bind(this);
    this.state = this._getStateFromStores();
  }

  componentWillMount() {
    ModuleStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ModuleStore.removeChangeListener(this._onChange);
  }

  render() {
    const { modulesState } = this.state;
    const modules = Object.keys(modulesState).map(mod => <li key={mod}>{ mod + ': ' + modulesState[mod] }</li>);
    const modules2 = Object.keys(modulesState).map(mod => <Module key={mod} moduleName={ mod } isSelected={ modulesState[mod] } handleSelectionChange={ this._handleSelectionChange } />);

    return (
      <div className="container-fluid">
        <h1>Welcome to Globalize &middot; So What&#39;cha Want</h1>
        <ul>
          { modules }
        </ul>
        { modules2 }
      </div>
    );
  }

  _onChange() {
    this.setState(this._getStateFromStores());
  }

  _handleSelectionChange(moduleName) {
    ModuleActions.moduleChanged(moduleName);
  }

  _getStateFromStores() {
    return ModuleStore.getState();
  }
}

export default App;
