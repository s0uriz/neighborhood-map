import React from "react";

class Aside extends React.Component {
  render() {
    return (
      <aside className="side-bar">
        <input
          className="search"
          type="text"
          id="location"
          placeholder="Location"
          onChange={this.props.handleLocationSearch}
        />
        <ul className="locations-list">
          {this.props.locations.map(location => {
            return <li key={location.name.toLowerCase()}>{location.name}</li>;
          })}
        </ul>
      </aside>
    );
  }
}

export default Aside;
