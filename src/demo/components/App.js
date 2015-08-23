import React from 'react/addons';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this._onChange = this._onChange.bind(this);
    // this.state = this._getStateFromStores();
  }

  // componentWillMount() {
  //   AppStore.addChangeListener(this._onChange);
  // }

  // componentWillUnmount() {
  //   AppStore.removeChangeListener(this._onChange);
  // }

  render() {
    return (
      <div className="container-fluid">
        Hello!
      </div>
    );
  }

  // _onChange() {
  //   this.setState(this._getStateFromStores());
  // }

  // _getStateFromStores() {
  //   return AppStore.getConnectionState();
  // }
}

export default App;
