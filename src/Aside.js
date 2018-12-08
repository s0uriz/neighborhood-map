import React from "react";

class Aside extends React.Component {
  render() {
    return (
      <aside
        className={this.props.isHidden ? "side-bar" : "side-bar side-bar--show"}
      >
        <input
          aria-label="Filter places"
          tabIndex="0"
          role="search"
          className="search"
          type="text"
          id="location"
          placeholder="Location"
          onChange={this.props.handleLocationSearch}
        />
        <nav>
          <ul className="locations-list">
            {this.props.locations.map(location => {
              return (
                <li
                  arial-label={location.name}
                  role="button"
                  tabIndex="0"
                  onClick={() => this.props.onListItemClick(location.name)}
                  onKeyPressCapture={() =>
                    this.props.onListItemClick(location.name)
                  }
                  key={location.id}
                >
                  {location.name}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    );
  }
}

export default Aside;
