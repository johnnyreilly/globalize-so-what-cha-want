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
    const optionsSelected = Object.assign({}, ...Object.keys(modulesState).map(mod => ({ [`${mod}`]: modulesState[mod].isSelected })));
    console.log(optionsSelected);
    const modules = Object.keys(modulesState).map(mod => <li key={mod}>{ mod + ': ' + modulesState[mod] }</li>);
    const modulesToSelect = Object.keys(modulesState).map(mod => <div className="col-md-4">
        <Module key={mod}
          moduleName={ mod }
          description={ modulesState[mod].description }
          isSelected={ modulesState[mod].isSelected }
          handleSelectionChange={ this._handleSelectionChange } />
      </div>);

    return (
      <div className="container-fluid">
        <h1>Welcome to Globalize &middot; So What&#39;cha Want</h1>
        <p>Tell me what <a href="https://github.com/jquery/globalize">Globalize</a> modules you want to use, I&#39;ll tell you what you need.</p>
        <div className="row">
          { modulesToSelect }
        </div>
        <ul>
          { modules }
        </ul>
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
