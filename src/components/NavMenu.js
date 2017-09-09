import React, { Component } from 'react';
import axios from 'axios';
import './NavMenu.css';

class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <ul className="nav-menu">
        <li><a href="">Home</a></li>
        <li><a href="">News</a></li>
        <li><a href="">Markets</a></li>
      </ul>
    );
  }
}

export default NavMenu;
