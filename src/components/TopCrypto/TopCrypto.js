import React, { Component } from 'react';
import CoinGecko from 'coingecko-api';

import axios from 'axios';
import './TopCrypto.css';

import { round, numberWithCommas } from '../../utils/priceFormatter';

const CoinGeckoClient = new CoinGecko();

class TopCrypto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: []
    };
  }

  fetchTopCoins() {
    CoinGeckoClient.coins.all()
    .then((coins) => {
        coins = coins.data.slice(0, 10);
        this.setState({
          coins
        });
    })
    .catch((error) => {
        console.log(error);
    });
  }

  componentDidMount() {
    this.fetchTopCoins();
    setInterval(() => {
      this.fetchTopCoins();
    }, 10000);
  }

  render() {
    const coins = this.state.coins;

    if (!coins.length) {
      return null;
    }

    const coinRows = coins.map((coin, index) => {
      const marketData = coin.market_data;
      const plusOrMinus = (marketData.price_change_percentage_24h > 0) ? '+' : '';
      const priceClassName = (marketData.price_change_percentage_24h > 0) ? 'green' : 'red';
      return (
        <tr key={index}>
          <td>{index++}</td>
          <td>{coin.name}</td>
          <td>${round(marketData.current_price.usd)}</td>
          <td className={priceClassName}>
            <span>{plusOrMinus}</span>{marketData.price_change_percentage_24h}%
          </td>
          <td>${numberWithCommas(marketData.market_cap.usd)}</td>
        </tr>
      );
    })
    return (
      <div className="top-crypto">
        <h2 className="top-title-label">Crypto Currency Ranking</h2>
        <p><a href="https://www.coinbase.com/join/549343ba76ee492408000124">$10 Worth of FREE Bitcoin by <u>signing up with Coinbase</u></a></p>
        <table className="table table-hover top-table">
          <thead>
            <tr>
              <td>Rank</td>
              <td>Name</td>
              <td>Price (USD)</td>
              <td>%Change 24 hr</td>
              <td>Market Cap (USD)</td>
            </tr>
          </thead>
          <tbody>
            {coinRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TopCrypto;
