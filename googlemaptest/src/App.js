import React, { Component } from 'react';
import Map from './Map.js'
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
          <h1 className="App-title">google map test area</h1>
            <div className='mapArea'>
          <Map />
        </div>
      </div>
    );
  }
}



export default App;
