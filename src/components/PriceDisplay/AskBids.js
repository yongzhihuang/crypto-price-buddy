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


  fetchAskBids() {
    const currency = this.props.currency || 'eth-usd';
    axios.get(`https://api.gdax.com/products/${currency}/book`)
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
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.fetchAskBids();
    }, 10000);
  }

  render() {
    this.fetchAskBids();
    const askBids = this.state.askBids;

    if (!askBids) {
      return null;
    }

    const symbol = (this.props.currency.indexOf('-eur') === -1) ? '$' : '€';
    return (
      <div className="askbids">
        <div className="asks">Sells: {symbol}{askBids.asksPrice} / {askBids.asksAmount} Orders</div>
        <div className="bids">Buys: {symbol}{askBids.bidsPrice} / {askBids.bidsAmount} Orders</div>
      </div>
    );
  }
}

export default AskBids;
