import React from 'react/addons';

class Module extends React.Component {
  constructor(props) {
    super(props);
    this._onSelectionChanged = this._onSelectionChanged.bind(this);
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">{ this.props.moduleName }</h3>
        </div>
        <div className="panel-body">
          <div className="checkbox">
            <label>
              <input type="checkbox" value="" checked={ this.props.isSelected } onChange={ this._onSelectionChanged } />
              { this.props.moduleName }
            </label>
          </div>
        </div>
      </div>
    );
  }

  _onSelectionChanged() {
    this.props.handleSelectionChange(this.props.moduleName);
  }
}

Module.propTypes = {
  moduleName: React.PropTypes.string.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  handleSelectionChange: React.PropTypes.func.isRequired
};

export default Module;
