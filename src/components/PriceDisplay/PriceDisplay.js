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
    const currency = this.props.currency || 'eth-usd';

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
    const currency = this.props.currency;
    const symbol = (currency.indexOf('-eur') === -1) ? '$' : '€';

    return (
      <div className="price-display">
        <div className="price"><a href={`https://www.gdax.com/trade/${currency}`} target="_blank" rel="noopener noreferrer">{symbol}{this.state.price}</a></div>
        <DailyStats currency={currency} />

        <AskBids currency={currency} />
        <PriceTarget currentPrice={this.state.price}/>
      </div>
    );
  }
}

export default PriceDisplay;
