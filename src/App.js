import React, { Component } from 'react';
import './App.css';

import PriceDisplay from './components/PriceDisplay/PriceDisplay';
import TopCrypto from './components/TopCrypto/TopCrypto';
import LatestNews from './components/LatestNews/LatestNews';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyType: 'all'
    };
  }

  render() {
    return (
      <div className="App">
        <PriceDisplay currency={this.state.currencyType} />
        <TopCrypto />
        <iframe title="yt-embed-crypto" width="100%" height="250" src="https://www.youtube.com/embed/OT5iufs218g" frameBorder="0" allowFullScreen></iframe>
        <LatestNews />

        <div className="about">
          <a href="http://cryptodam.us" target="_blank" rel="noopener noreferrer"><img src="https://i.imgur.com/3BVkvMh.png" width="100%" alt="Join Cryptodamus Community for free" /></a>
        </div>
      </div>
    );
  }
}

export default App;
