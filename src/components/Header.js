import React, { Component } from 'react';
import "../App.css";

class Header extends Component {
  render() {
    return (
        <header>
            <div className="hamburger-menu">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </header>
    )
  }
}

export default Header;