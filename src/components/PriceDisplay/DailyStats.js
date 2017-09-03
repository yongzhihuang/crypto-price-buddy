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
    const currency = this.props.currency || 'eth-usd';
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

    const refreshInterval = setInterval(() => {
      this.fetchDailyStats();
    }, 10000);

    this.setState({
      interval: refreshInterval
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.interval);
  }

  render() {
    const dailyStats = this.state.dailyStats;

    if (!dailyStats) {
      return null;
    }

    return (
      <div className="daily-stats">
        <p>Open: <b>{dailyStats.open}</b></p>
        <p>High: <b>{dailyStats.high}</b></p>
        <p>Low: <b>{dailyStats.low}</b></p>
        <p>Volume: <b>{numberWithCommas(dailyStats.volume)}</b></p>
      </div>
    );
  }
}

export default DailyStats;
