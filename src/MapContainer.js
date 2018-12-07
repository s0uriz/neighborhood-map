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
              likes={place.likes}
              price={place.price}
              position={place.location}
              tabIndex="0"
            />
          );
        })}
        <InfoWindow
          marker={this.props.activeMarker}
          visible={this.props.showingInfoWindow}
        >
          <div className="place-info" aria-label="placeinfo">
            <h2 tabIndex="0">{this.props.selectedPlace.name}</h2>
            {this.props.selectedPlace.photos
              ? this.props.selectedPlace.photos.map(photo => (
                  <img
                    key={photo}
                    className="place-img"
                    src={photo}
                    alt={this.props.selectedPlace.name}
                  />
                ))
              : null}
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API
})(MapContainer);
