import React from "react";
import Header from "./Header";
import Aside from "./Aside";
import MapContainer from "./MapContainer";

const locationsList = [
  {
    name: "Banzaan Fresh Market",
    location: { lat: 7.8896585, lng: 98.3014047 }
  },
  {
    name: "Jungceylon Shopping Center",
    location: { lat: 7.8924074, lng: 98.2983747 }
  },
  {
    name: "5 Star Massage & Beauty Salon",
    location: { lat: 7.8878638, lng: 98.2969907 }
  },
  {
    name: "Apk Resort And Spa",
    location: { lat: 7.8913009, lng: 98.2988097 }
  },
  {
    name: "Tiger Disco",
    location: { lat: 7.8916045, lng: 98.2988196 }
  },
  {
    name: "Royal Paradise Night Market",
    location: { lat: 7.89235, lng: 98.2984762 }
  },
  {
    name: "Loma Market",
    location: { lat: 7.893774, lng: 98.2997852 }
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      locations: locationsList,
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

  render() {
    const { isHidden } = this.state;
    if (this.state.value) {
      this.state.locations = this.state.locations.filter(location =>
        location.name.toLowerCase().includes(this.state.value.toLowerCase())
      );
    } else {
      this.state.locations = locationsList;
    }
    return (
      <div className="wrapper">
        <Header
          toggleSidebar={this.toggleSidebar}
          isHidden={this.state.isHidden}
        />
        {isHidden ? (
          <Aside
            locations={this.state.locations}
            handleLocationSearch={this.handleLocationSearch}
          />
        ) : null}
        <main className={!isHidden ? "width-100" : ""}>
          <MapContainer
            locations={this.state.locations}
            activeMarker={this.state.activeMarker}
            showingInfoWindow={this.state.showingInfoWindow}
            selectedPlace={this.state.selectedPlace}
            onMarkerClick={this.onMarkerClick}
            onMapClicked={this.onMapClicked}
          />
        </main>
      </div>
    );
  }
}

export default App;
