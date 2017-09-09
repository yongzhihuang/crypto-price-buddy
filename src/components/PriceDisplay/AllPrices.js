import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
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
        let bgColor = '#40a740';
        const price = Number(currency.price);
        if (window.localStorage[`all${currency}`] && Number(window.localStorage[`all${currency}`]) < price) {
          bgColor = '#e04242';
        }
        window.localStorage[`all${currency}`] = price;
        return (
          <li className="all-prices" key={idx}>
            <div className="all-currency-symbol">
            <img alt={currency.symbol} src={this.state.currencyLogos[currency.symbol]} /> {currency.symbol}
            </div>
            <a className="all-currency-price" href={`https://www.gdax.com/trade/${currency.symbol}`} target="_blank" rel="noopener noreferrer"><span className="currency-symbol">
              $</span><AnimatedNumber component="text" value={price}
              style={{
                  transition: '0.8s ease-out',
                  transitionProperty:
                      'background-color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: bgColor}
              )}
              duration={700}
              formatValue={(n) => {
                return round(n);
              }}
            />
            </a>
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
