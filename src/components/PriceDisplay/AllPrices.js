import React, { Component } from 'react';
import axios from 'axios';
import P from 'bluebird';
import './AllPrices.css';

import { round } from '../../utils/priceFormatter';

class AllPrices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currenciesData: []
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
    })
    .catch((error) => {
      console.error(error);
    })
  }

  componentDidMount() {
    this.fetchALLPrices();

    const refreshInterval = setInterval(() => {
      this.fetchALLPrices();
    }, 10000);

    this.setState({
      interval: refreshInterval
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.interval);
  }

  render() {
    const priceDisplay = this.state.currenciesData.map((currency, idx) => {
      if (currency) {
        return (
          <div className="all-prices" key={idx}>
            <div className="all-currency-symbol">{currency.symbol}</div>
            <a className="all-currency-price" href={`https://www.gdax.com/trade/${currency.symbol}`} target="_blank" rel="noopener noreferrer">{round(currency.price)}</a>
          </div>
        );

      }
    })

    return (
      <div className="price-display">
        {priceDisplay}
      </div>
    );
  }
}

export default AllPrices;
