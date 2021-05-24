import React, { Component } from 'react';
import axios from 'axios';
import './AskBids.css';

import { round } from '../../utils/priceFormatter';
class AskBids extends Component {
  constructor(props) {
    super(props);

    this.state = {
      askbids: {
        asksPrice: 0,
        asksAmount: 0,
        bidsPrice: 0,
        bidsAmount: 0
      }
    };
  }

  fetchAskBids(props) {
    const currency = props.currency || 'eth-usd';
    axios.get(`https://api.pro.coinbase.com/products/${currency}/book`)
    .then((res) => {
      const data = res.data;
      if (data) {
        this.setState({
          askBids: {
            asksPrice: round(data.asks[0][0]),
            asksAmount: round(data.asks[0][1]),
            bidsPrice: round(data.bids[0][0]),
            bidsAmount: round(data.bids[0][1])
          }
        });
        this.fetchRefresh = setTimeout(() => {
          this.fetchAskBids(props);
        }, 10000);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentWillMount() {
    this.fetchAskBids(this.props);
  }

  componentWillReceiveProps(nextProp) {
    this.fetchAskBids(nextProp);
  }

  componentWillUnmount() {
    window.clearTimeout(this.fetchRefresh);
  }

  render() {
    const askBids = this.state.askBids;

    if (!askBids) {
      return null;
    }

    const symbol = (this.props.currency.indexOf('-eur') === -1) ? '$' : '€';
    const askBidDisplay = parseInt(askBids.bidsAmount, 10) < parseInt(askBids.asksAmount, 10) ? `Sell Wall: ${askBids.asksAmount} | Price: ${symbol}${askBids.asksPrice}` : `Buy Wall: ${askBids.bidsAmount} | Price: ${symbol}${askBids.bidsPrice}`
    return (
      <div className="askbids">
        {askBidDisplay}
      </div>
    );
  }
}

export default AskBids;
