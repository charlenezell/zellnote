import React, { Component } from 'react';
import MyEditor from './MyEditor';
import './App.css';
import '../node_modules/draft-js/dist/Draft.css';
import '../node_modules/draft-js-mention-plugin/lib/plugin.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <MyEditor />
      </div>
    );
  }
}

export default App;
