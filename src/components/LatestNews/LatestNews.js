import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './LatestNews.css';

class LatestNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: []
    };
  }

  fetchNews() {
    axios.get(`https://www.reddit.com/r/ethtrader+bitcoin+litecoin+ethereum.json`)
    .then((res) => {
      const data = res.data;
      if (data) {
        this.setState({
          news: data.data.children.slice(0, 9)
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.fetchNews();
  }

  render() {
    const news = this.state.news;

    if (!news.length) {
      return null;
    }

    const newsRows = news.map((news, index) => {
      const newsItem = news.data;

      return (
        <tr key={index}>
          <td className="no-align"><a href={newsItem.url} target="_blank">{newsItem.title} ({moment.unix(newsItem.created_utc).fromNow()})</a></td>
          <td>{newsItem.subreddit_name_prefixed}</td>
        </tr>
      );
    });

    return (
      <div className="latest-news">
        <h2 className="top-title-label">Latest Crypto News</h2>
        <table className="table table-hover top-table">
          <thead>
            <tr>
              <td>Headline</td>
              <td>Currency</td>
            </tr>
          </thead>
          <tbody>
            {newsRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default LatestNews;
