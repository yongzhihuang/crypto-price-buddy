import React, { Component } from 'react';
import './PriceTarget.css';

class PriceTarget extends Component {
  constructor(props) {
    super(props);
    this.setTargetPrice = this.setTargetPrice.bind(this);

    this.state = {
      priceTarget: window.localStorage.priceTarget || 500
    };
  }

  setTargetPrice() {
    const target = prompt('What is your price target?');
    if (target) {
      this.setState({
        priceTarget: target
      });
    }
  }


  render() {
    const pricePercentage = parseFloat((this.props.currentPrice/this.state.priceTarget) * 100).toFixed(2);

    return (
      <div className="price-target">
        <div className="set-target" onClick={this.setTargetPrice}>Set Price Target</div>
        <div className="target">Price Target: {this.state.priceTarget} ({pricePercentage}%)</div>
      </div>
    );
  }
}

export default PriceTarget;
