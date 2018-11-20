import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

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

  toggleSidebar = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {
    const style = {
      width: "100%",
      height: "100%"
    };
    const { isHidden} = this.state;
    if (this.state.value) {
      this.state.locations = this.state.locations.filter(location =>
        location.name.toLowerCase().includes(this.state.value.toLowerCase())
      );
    } else {
      this.state.locations = locationsList;
    }
    return (
      <div className="wrapper">
        <header className={!isHidden ? 'padding-20' : ''}>
          <div className="hamburger-menu" onClick={this.toggleSidebar}>
            <div />
            <div />
            <div />
          </div>
        </header>
        {isHidden ? (
          <aside className="side-bar">
            <input
              className="search"
              type="text"
              id="location"
              placeholder="Location"
              onChange={this.handleLocationSearch}
            />
            <ul className="locations-list">
              {this.state.locations.map(location => {
                return <li key={location.name.toLowerCase()}>{location.name}</li>;
              })}
            </ul>
          </aside>
        ) : null}
        <main className={!isHidden ? 'width-100' : ''}>
          <Map
            google={this.props.google}
            onClick={this.onMapClicked}
            style={style}
            initialCenter={{
              lat: 7.8922116,
              lng: 98.2979299
            }}
            zoom={16}
          >
            {this.state.locations.map(place => {
              return (
                <Marker
                  onClick={this.onMarkerClick}
                  key={place.name.toString()}
                  title={place.name}
                  name={place.name}
                  position={place.location}
                // animation={this.props.google.maps.Animation.BOUNCE}
                />
              );
            })}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <h2>{this.state.selectedPlace.name}</h2>
              </div>
            </InfoWindow>
          </Map>
        </main>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBBJzSPHKD0QIhvL89QsoK_BX7SqPZTYTI"
})(App);
