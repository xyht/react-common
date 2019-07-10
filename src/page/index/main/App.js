import React, { Component } from 'react';

class App extends Component {
  state = {}
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
