import React from "react";
import Header from "./Header";
import Aside from "./Aside";
import MapContainer from "./MapContainer";
import axios from "axios";
require("dotenv").config();

const locationsList = [
  {
    name: "The Royal Paradise",
    id: "4bc8f338762beee121bc3d38",
    location: { lat: 7.8956739, lng: 98.2983121 }
  },
  {
    name: "Graceland Resort & Spa",
    id: "4ba640e2f964a5205e3f39e3",
    location: { lat: 7.9026904, lng: 98.2964704 }
  },
  {
    name: "Holiday Inn Express",
    id: "50d9911ce4b091e31f9b6029",
    location: { lat: 7.8998727, lng: 98.2978396 }
  },
  {
    name: "Novotel Phuket Vintage Park",
    id: "4f20da43e4b0a74242b6b017",
    location: { lat: 7.8986813, lng: 98.2982533 }
  },
  {
    name: "Patong Heritage",
    id: "50de918fe4b0a6d1bdb0a049",
    location: { lat: 7.8894332, lng: 98.2945734 }
  },
  {
    name: "Acca Patong",
    id: "5101d503e4b01fa7d6d83153",
    location: { lat: 7.8926379, lng: 98.2983319 }
  },
  {
    name: "Sleep With Me",
    id: "2bdcb2711d2b0571b3b98ce",
    location: { lat: 7.8910755, lng: 98.2960458 }
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
      isHidden: true,
      venues: []
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
    this.updateLoc();
    this.getVenues();
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/VENUE_ID/photos?";
    const params = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      VENUE_ID: "2bdcb2711d2b0571b3b98ce",
      limit: "5",
      v: "20180312"
    };
    axios
      .get(endPoint + new URLSearchParams(params))
      .then(res => {
        //this.setState({ venues: res.data.response.groups[0].items });
        console.log(res.data.response.photos.items);
      })
      .catch(err => console.log(err));
  };

  updateLoc = () => {
    let locations = this.state.locations;
    let photos = [];
    locations.map(location => {
      let tag = location.name;
      fetch(
        "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" +
          process.env.REACT_APP_FLICKR_KEY +
          "&tags=" +
          tag +
          "&per_page=2&page=1&format=json&nojsoncallback=1"
      )
        .then(res => res.json())
        .then(data => {
          let photo = data.photos.photo.map(pic => {
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
          photos.push(photo);
          location["photos"] = photo;
        });
    });
    this.setState({
      locations: locations
    });
    console.log(photos);
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
        <Header
          toggleSidebar={this.toggleSidebar}
          isHidden={this.state.isHidden}
        />
        {isHidden ? (
          <Aside
            locations={locations}
            handleLocationSearch={this.handleLocationSearch}
            onListItemClick={this.onListItemClick}
          />
        ) : null}
        <main className={!isHidden ? "width-100" : ""}>
          <MapContainer
            locations={locations}
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
