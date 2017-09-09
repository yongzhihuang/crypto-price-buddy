import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import axios from 'axios';
import './TopCrypto.css';

import { round, numberWithCommas } from '../../utils/priceFormatter';

class TopCrypto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: []
    };
  }

  fetchTopCoins() {
    const COINMARKETCAP_API_URI = 'https://api.coinmarketcap.com';

    axios.get(`${COINMARKETCAP_API_URI}/v1/ticker/?limit=10`)
    .then((resp) => {
      this.coins = resp.data;
      this.setState({
        coins: resp.data
      })
    })
    .catch((error) => {
      console.error(error);
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
      const plusOrMinus = (coin.percent_change_24h > 0) ? '+' : '';
      const priceClassName = (coin.percent_change_24h > 0) ? 'green' : 'red';
      return (
        <tr key={index}>
          <td>{coin.rank}</td>
          <td>{coin.name}</td>
          <td>$<AnimatedNumber component="text" value={coin.price_usd}
              style={{
                  transition: '0.8s ease-out',
                  transitionProperty:
                      'background-color, color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: '#344e6b'}
              )}
              duration={300}
              formatValue={n => round(n)}
            />
          </td>
          <td className={priceClassName}>
            <span>{plusOrMinus}</span>
            <AnimatedNumber component="text" value={coin.percent_change_24h}
              style={{
                  transition: '0.8s ease-out',
                  transitionProperty:
                      'background-color, color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: '#344e6b'}
              )}
              duration={500}
              formatValue={n => round(n)}
            />%
          </td>
          <td>
            <AnimatedNumber component="text" value={coin.market_cap_usd}
              style={{
                  transition: '0.8s ease-out',
                  transitionProperty:
                      'background-color, color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: '#344e6b'}
              )}
              duration={500}
              formatValue={n => numberWithCommas(n)}
            /></td>
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
