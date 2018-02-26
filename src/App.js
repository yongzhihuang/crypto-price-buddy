import React, { Component } from 'react';
import './App.css';

import PriceDisplay from './components/PriceDisplay/PriceDisplay';
import TopCrypto from './components/TopCrypto/TopCrypto';
import LatestNews from './components/LatestNews/LatestNews';

class App extends Component {
  constructor(props) {
    super(props);
    this.setCurrencyType = this.setCurrencyType.bind(this);
    this.state = {
      currencyOptions: [
        'all',

        'eth-usd',
        'eth-eur',

        'btc-usd',
        'btc-eur',

        'ltc-usd',
        'ltc-eur'
      ],
      currencyType: window.localStorage.selectedCurrency || 'all'
    };
  }

  setCurrencyType(e) {
    this.setState({
      currencyType: e.target.value
    });
    window.localStorage.selectedCurrency = e.target.value;
  }

  render() {
    const optionsDOM = this.state.currencyOptions.map((currency, idx) => {
      if (currency === window.localStorage.selectedCurrency) {
        return <option key={idx} value={currency} selected>{currency}</option>;
      }

      return <option key={idx} value={currency} >{currency}</option>;
    });

    return (
      <div className="App">
        <select className="currency-type" onChange={this.setCurrencyType}>
          {optionsDOM}
        </select>

        <div className="display-notice">
          Note: This App is best viewed on a small screen or mobile device. Add it to your device homepage to display as an App.
        </div>

        <PriceDisplay currency={this.state.currencyType} />
        <TopCrypto />
        <a href="http://cryptodam.us" target="_blank" rel="noopener noreferrer"><img src="https://i.imgur.com/3BVkvMh.png" width="100%" alt="Join Cryptodamus Community for free" /></a>
        <LatestNews />

        <div className="about">
        <iframe title="yt-embed-crypto" width="100%" height="250" src="https://www.youtube.com/embed/OT5iufs218g" frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
    );
  }
}

export default App;
