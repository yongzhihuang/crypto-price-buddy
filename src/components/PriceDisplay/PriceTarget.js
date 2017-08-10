import React, { Component } from 'react';
import './PriceTarget.css';

class PriceTarget extends Component {
  render() {
    return (
      <div className="price-target">
        <div className="set-target">Set Price Target</div>
        <div className="target"></div>
      </div>
    );
  }
}

export default PriceTarget;
