import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends React.Component {
  render() {
    const style = { width: "100%", height: "100%" };
    return (
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        style={style}
        initialCenter={{ lat: 7.8968216, lng: 98.2998142 }}
        zoom={15}
      >
        {this.props.locations.map(place => {
          return (
            <Marker
              onClick={this.props.onMarkerClick}
              key={place.id}
              title={place.name}
              name={place.name}
              photos={place.photos}
              position={place.location}
              tabIndex="0"
            />
          );
          // animation={this.props.google.maps.Animation.BOUNCE}
        })}
        <InfoWindow
          marker={this.props.activeMarker}
          visible={this.props.showingInfoWindow}
        >
          <div aria-label="placeinfo">
            <h2 tabIndex="0">{this.props.selectedPlace.name}</h2>
            <img
              className="place-img"
              src={this.props.selectedPlace.photos}
              alt={this.props.selectedPlace.name}
            />
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API
})(MapContainer);
