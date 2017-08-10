import React, { Component } from 'react';
import './App.css';

import PriceDisplay from './components/PriceDisplay/PriceDisplay';
import TopCrypto from './components/TopCrypto/TopCrypto';


class App extends Component {
  render() {
    return (
      <div className="App">
        <PriceDisplay />
        <TopCrypto />
      </div>
    );
  }
}

export default App;
