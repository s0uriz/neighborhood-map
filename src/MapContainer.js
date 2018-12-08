import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends React.Component {
  render() {
    const style = { width: "100%", height: "100%" };
    return (
      <Map
        google={this.props.google}
        onClick={this.props.onMapClicked}
        style={style}
        initialCenter={this.props.locationCenter}
        zoom={13}
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
              animation={this.props.google.maps.Animation.DROP}
            />
          );
        })}
        <InfoWindow
          marker={this.props.activeMarker}
          visible={this.props.showingInfoWindow}
          onClose={this.props.onMapClicked}
          tabIndex="0"
        >
          {this.props.error ? (
            <div className="place-info" aria-label="placeinfo">
              <span className="error" aria-label="error">
                {this.props.info}
              </span>
            </div>
          ) : (
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
          )}
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API
})(MapContainer);
