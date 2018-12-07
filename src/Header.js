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
          onClick={this.props.toggleSidebar}
          onKeyPressCapture={this.props.toggleSidebar}
        >
          <div className="hamburger" />
        </div>
        <span className="heading">Hotels, Patong</span>
      </header>
    );
  }
}

export default Header;
