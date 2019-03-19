import React from "react";
import Header from "./Header";
import Aside from "./Aside";
import MapContainer from "./MapContainer";
import axios from "axios";
require("dotenv").config();

//Display message if the map does not load
window.gm_authFailure = () => {
  let error = document.getElementById("error-message");
  error.innerHTML = "We cant access Google Maps API for now!";
  error.classList.remove("hidden");
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationCenter: { lat: 40.747664, lng: -74.0107375 },
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      locations: [],
      isHidden: true,
      info: "",
      error: false
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
  animateMarker = () => {
    let marker = this.state.activeMarker;
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 550);
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

  //getting locations
  componentDidMount() {
    this.getLocations();
  }

  //getting photos for locations
  componentDidUpdate() {
    let locations = this.state.locations;
    locations.map(location => {
      let tag = location.name;
      axios
        .get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
            process.env.REACT_APP_FLICKR_KEY
          }&tags=${tag}&per_page=2&page=1&format=json&nojsoncallback=1`
        )
        .then(data => {
          //console.log(data.data.photos.photo);
          let photo = data.data.photos.photo.map(pic => {
            let src =
              "http://farm" +
              pic.farm +
              ".staticflickr.com/" +
              pic.server +
              "/" +
              pic.id +
              "_" +
              pic.secret +
              ".jpg";
            return src;
          });
          if (photo.length > 0) {
            location["photos"] = photo;
          } else {
            // if image not found showing "No Image Found"
            location["photos"] = [
              "https://artelectronics.ru/default_images/main_image/base/missing.jpg"
            ];
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            info: "Sorry data can't be loaded",
            error: true
          });
        });
      return location;
    });
  }

  getLocations = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/search?";
    const params = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      v: "20181203",
      ll: this.state.locationCenter.lat + "," + this.state.locationCenter.lng,
      query: "museum",
      radius: 3000,
      limit: 20
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
      .catch(err => {
        console.log(err.response);
        if (err) {
          let error = document.getElementById("error-message");
          error.innerHTML = "Sorry data can't be loaded";
          error.classList.remove("hidden");
        }
      });
  };

  render() {
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
        <main className="main">
          <Header
            toggleSidebar={this.toggleSidebar}
            isHidden={this.state.isHidden}
          />
          <div className="map-container" aria-label="map-container">
            <div id="error-message" className="error-message hidden">
              eror text
            </div>
            <MapContainer
              locationCenter={this.state.locationCenter}
              locations={locations}
              activeMarker={this.state.activeMarker}
              showingInfoWindow={this.state.showingInfoWindow}
              selectedPlace={this.state.selectedPlace}
              onMarkerClick={this.onMarkerClick}
              onMapClicked={this.onMapClicked}
              info={this.state.info}
              error={this.state.error}
              animateMarker={this.animateMarker}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
