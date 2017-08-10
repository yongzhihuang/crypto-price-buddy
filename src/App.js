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

        <div className="about">
          <p>Don't forget to add us to home screen</p>
          <p>Made by <a href="https://www.twitter.com/whyzhi">@whyzhi</a></p>
        </div>
      </div>
    );
  }
}

export default App;
