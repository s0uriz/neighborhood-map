import React, { Component } from 'react';
import SearchBox from './SearchBox'

class Aside extends Component {
  render() {
    return (
        <aside className="side-bar">
          <SearchBox />
        </aside>
    )
  }
}

export default Aside;