import React, { Component } from 'react';
import axios from 'axios';
import './PriceDisplay.css';

import AskBids from './AskBids';
import DailyStats from './DailyStats';
import PriceTarget from './PriceTarget';

import { round } from '../../utils/priceFormatter';

class PriceDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0
    }
  }

  fetchPrice() {
    const currency = this.props.currencyType || 'eth-usd';
    axios.get(`https://api.gdax.com/products/${currency}/ticker`)
    .then((res) => {
      if (res.data.price) {
        const price = round(res.data.price);
        this.setState({
          price
        });
        document.title = `$${price}`;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.fetchPrice();
    setInterval(() => {
      this.fetchPrice();
    }, 10000);
  }

  render() {
    return (
      <div className="price-display">
        <select className="currency-type">
          <option value="eth-usd">eth-usd</option>
          <option value="eth-eur">eth-eur</option>

          <option value="btc-usd">btc-usd</option>
          <option value="btc-eur">btc-eur</option>

          <option value="ltc-usd">ltc-usd</option>
          <option value="ltc-eur">ltc-eur</option>
        </select>

        <div className="price"><a href="">${this.state.price}</a></div>

        <AskBids />
        <DailyStats />
        <PriceTarget />
      </div>
    );
  }
}

export default PriceDisplay;
