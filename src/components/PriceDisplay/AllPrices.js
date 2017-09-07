import React, { Component } from 'react';
import axios from 'axios';
import P from 'bluebird';
import './AllPrices.css';

import { round } from '../../utils/priceFormatter';

class AllPrices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currenciesData: [],
      currencyLogos: {
        'btc-usd': 'https://files.coinmarketcap.com/static/img/coins/32x32/bitcoin.png',
        'eth-usd': 'https://files.coinmarketcap.com/static/img/coins/32x32/ethereum.png',
        'ltc-usd': 'https://files.coinmarketcap.com/static/img/coins/32x32/litecoin.png'
      }
    }
  }

  getSingleCurrencyData(currency) {
    return axios.get(`https://api.gdax.com/products/${currency}/ticker`)
      .then((data) => {
        return {...data.data, symbol: currency};
      })
  }

  fetchALLPrices() {
    const currencies = ['btc-usd', 'eth-usd', 'ltc-usd'];
    P.all(currencies.map((currency) => {
      return this.getSingleCurrencyData(currency);
    }))
    .then((result) => {
      this.setState({
        currenciesData: result
      });

      this.fetchRefresh = setTimeout(() => {
        this.fetchALLPrices();
      }, 10000);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  componentWillMount() {
    this.fetchALLPrices();
  }

  componentWillUnmount() {
    window.clearTimeout(this.fetchRefresh);
  }

  render() {
    const priceDisplay = this.state.currenciesData.map((currency, idx) => {
      if (currency) {
        return (
          <li className="all-prices" key={idx}>
            <div className="all-currency-symbol">
            <img alt={currency.symbol} src={this.state.currencyLogos[currency.symbol]} /> {currency.symbol}
            </div>
            <a className="all-currency-price" href={`https://www.gdax.com/trade/${currency.symbol}`} target="_blank" rel="noopener noreferrer"><span className="currency-symbol">$</span>{round(currency.price)}</a>
          </li>
        );
      }
      return '';
    })

    return (
      <ul className="price-display-all">
        {priceDisplay}
      </ul>
    );
  }
}

export default AllPrices;
