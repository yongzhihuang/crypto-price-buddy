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
      currencyType: window.localStorage.selectedCurrency || 'eth-usd'
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
        <iframe title="yt-embed-crypto" width="100%" height="250" src="https://www.youtube.com/embed/OT5iufs218g" frameBorder="0" allowFullScreen></iframe>
        <LatestNews />

        <div className="about">
          <p>Donate ETH: 0x79aCad1654fd277096571E536b9Bd49b33c024e4</p>
          <p>Don't forget to add us to home screen</p>
          <p>Made by <a href="https://www.twitter.com/whyzhi">@whyzhi</a></p>
        </div>
      </div>
    );
  }
}

export default App;
