import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header>
        <div
          className={
            this.props.isHidden ? "hamburger-icon " : "hamburger-icon active"
          }
          role="button"
          tabIndex="1"
          aria-label="button"
          onClick={this.props.toggleSidebar}
          onKeyPressCapture={this.props.toggleSidebar}
        >
          <div className="hamburger" />
        </div>
        <span className="heading" aria-label="hotels-patong">
          Museums, NY
        </span>
      </header>
    );
  }
}

export default Header;
