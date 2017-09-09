import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import axios from 'axios';
import './PriceDisplay.css';

import AskBids from './AskBids';
import DailyStats from './DailyStats';
import PriceTarget from './PriceTarget';

import AllPrices from './AllPrices';

import { round } from '../../utils/priceFormatter';

class PriceDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0
    }
  }

  fetchPrice(props) {
    const currency = props.currency || 'eth-usd';

    axios.get(`https://api.gdax.com/products/${currency}/ticker`)
    .then((res) => {
      if (res.data.price) {
        const price = res.data.price;
        this.setState({
          price
        });
        document.title = `$${price}`;
        this.fetchRefresh = setTimeout(() => {
          this.fetchPrice(props);
        }, 10000);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentWillMount() {
    if (this.props.currency === 'all') {
      return;
    }
    this.fetchPrice(this.props);
  }

  componentWillReceiveProps(nextProp) {
    let id = window.setTimeout(function() {}, 0);

    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    this.fetchPrice(nextProp);
  }

  componentWillUnmount() {
    window.clearTimeout(this.fetchRefresh);
  }

  render() {
    const currency = this.props.currency;
    const symbol = (currency.indexOf('-eur') === -1) ? '$' : '€';

    if (this.props.currency === 'all') {
      return <AllPrices />;
    }

    let bgColor = '#40a740';
    const price = Number(this.state.price);
    if (window.localStorage[currency] && Number(window.localStorage[currency]) < price) {
      bgColor = '#e04242';
    }
    window.localStorage[currency] = price;

    return (
      <div className="price-display">
        <div className="price">
          <a href={`https://www.gdax.com/trade/${currency}`} target="_blank" rel="noopener noreferrer"><span className="currency-symbol">{symbol}</span>
            <AnimatedNumber component="text" value={price}
              style={{
                  transition: '0.8s ease-out',
                  transitionProperty:
                      'background-color, color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: bgColor}
              )}
              duration={500}
              formatValue={(n) => {
                console.log(n);
                return round(n);
              }}
            />
          </a>
        </div>

        <AskBids currency={currency} />
        <DailyStats currency={currency} />
        <PriceTarget currentPrice={this.state.price}/>
      </div>
    );
  }
}

export default PriceDisplay;
