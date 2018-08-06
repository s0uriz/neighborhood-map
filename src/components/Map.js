import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    locations: [
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
    ]
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const style = {
      width: "100%",
      height: "100%"
    };
    return (
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
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBBJzSPHKD0QIhvL89QsoK_BX7SqPZTYTI"
})(MapContainer);
