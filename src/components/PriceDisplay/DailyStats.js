import React, { Component } from 'react';
import axios from 'axios';
import './DailyStats.css';

import { round, numberWithCommas } from '../../utils/priceFormatter';

class DailyStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dailyStats: null
    }
  }

  fetchDailyStats() {
    const currency = this.props.currencyType || 'eth-usd';
    axios.get(`https://api.gdax.com/products/${currency}/stats`)
    .then((res) => {
      const data = res.data;
      if (data) {
        const dailyStats = {
          open: round(data.open),
          high: round(data.high),
          low: round(data.low),
          volume: round(data.volume)
        };
        this.setState({
          dailyStats
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.fetchDailyStats();
    setInterval(() => {
      this.fetchDailyStats();
    }, 10000);
  }

  render() {
    const dailyStats = this.state.dailyStats;

    if (!dailyStats) {
      return null;
    }
    return (
      <div className="daily-stats">
        Open: <b>{dailyStats.open}</b>&nbsp;/&nbsp;
        High: <b>{dailyStats.high}</b>&nbsp;/&nbsp;
        Low: <b>{dailyStats.low}</b>&nbsp;/&nbsp;
        Volume: <b>{numberWithCommas(dailyStats.volume)}</b>
      </div>
    );
  }
}

export default DailyStats;
