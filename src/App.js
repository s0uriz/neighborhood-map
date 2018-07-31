import React, { Component } from "react";
import "./App.css";
import Aside from "./components/Aside";
import MapContainer from "./components/Map";

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Aside />
        <main>
          <MapContainer />
        </main>
      </div>
    );
  }
}

export default App;
