import React from "react";
import Header from "./Header";
import Aside from "./Aside";
import MapContainer from "./MapContainer";
import axios from "axios";
require("dotenv").config();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      locations: [],
      isHidden: true
    };
  }

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  handleLocationSearch = event => {
    this.setState({
      value: event.target.value
    });
  };

  toggleSidebar = event => {
    this.setState({
      isHidden: !this.state.isHidden,
      value: event.target.value
    });
  };

  onListItemClick = locationName => {
    document.querySelector(`[title="${locationName}"]`).click();
  };

  componentDidMount() {
    this.getLocations();
  }

  componentDidUpdate() {
    let locations = this.state.locations;
    locations.map(location => {
      this.getDetails(location.id);
    });
  }

  getLocations = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/search?";
    const params = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      v: "20181203",
      ll: "7.8968216,98.2998142",
      query: "seafood",
      radius: 1000
    };
    axios
      .get(endPoint + new URLSearchParams(params))
      .then(res => {
        let location = res.data.response.venues.map(venue => {
          let place = {
            name: venue.name,
            location: { lat: venue.location.lat, lng: venue.location.lng },
            id: venue.id
          };
          return place;
        });
        this.setState({
          locations: location
        });
      })
      .catch(err => console.log(err));
  };

  getDetails = id => {
    const endPoint = "https://api.foursquare.com/v2/venues/" + id + "?";
    const params = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      v: "20181203"
    };
    axios
      .get(endPoint + new URLSearchParams(params))
      .then(res => {
        console.log(res.data.response.venue);
      })
      .catch(err => console.log(err.response));
  };

  render() {
    const { isHidden } = this.state;
    let locations = this.state.locations;

    if (this.state.value) {
      locations = locations.filter(location =>
        location.name.toLowerCase().includes(this.state.value.toLowerCase())
      );
    } else {
      locations = this.state.locations;
    }

    return (
      <div className="wrapper">
        <Aside
          locations={locations}
          handleLocationSearch={this.handleLocationSearch}
          onListItemClick={this.onListItemClick}
          isHidden={this.state.isHidden}
        />
        <main className={!this.state.isHidden ? "main" : "main main-full"}>
          <Header
            toggleSidebar={this.toggleSidebar}
            isHidden={this.state.isHidden}
          />
          <div className="map-container">
            <MapContainer
              locations={locations}
              activeMarker={this.state.activeMarker}
              showingInfoWindow={this.state.showingInfoWindow}
              selectedPlace={this.state.selectedPlace}
              onMarkerClick={this.onMarkerClick}
              onMapClicked={this.onMapClicked}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
