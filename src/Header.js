import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header className={!this.props.isHidden ? 'padding-20' : ''}>
        <div className="hamburger-menu" onClick={this.props.toggleSidebar}>
          <div />
          <div />
          <div />
        </div>
      </header>
    )
  }
}

export default Header;