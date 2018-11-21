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
        initialCenter={{ lat: 7.8922116, lng: 98.2979299 }}
        zoom={16}
      >
        {this.props.locations.map(place => {
          return (
            <Marker
              onClick={this.props.onMarkerClick}
              key={place.name.toString()}
              title={place.name}
              name={place.name}
              position={place.location}
              // animation={this.props.google.maps.Animation.BOUNCE}
            />
          );
        })}
        <InfoWindow
          marker={this.props.activeMarker}
          visible={this.props.showingInfoWindow}
        >
          <div>
            <h2>{this.props.selectedPlace.name}</h2>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBBJzSPHKD0QIhvL89QsoK_BX7SqPZTYTI"
})(MapContainer);
