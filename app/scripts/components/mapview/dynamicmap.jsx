var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var update = require("react-addons-update");
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var google = require('react-google-maps');
var ScriptjsLoader = require("react-google-maps/lib/async/ScriptjsLoader");
var GoogleMap = google.GoogleMap;
var GoogleMapLoader = google.GoogleMapLoader;
var Marker = google.Marker;

var ParkMap = React.createClass({
  getInitialState: function(){
   var state = {
     markers: this.props.parks,
     zoom: 12,
     center: {
       lat: parseFloat(this.props.lat),
       lng: parseFloat(this.props.lng)
     }
    }
    return state;
  },
  componentWillReceiveProps: function(nextProps){
    //need this because these props may be received later and wont cause rerender unless you use willreceiveprops
    if(nextProps.parks){
      this.setState({
        markers: nextProps.parks
      });
    }
  },
  handleDrag: function(){
    // on drag set a new center and zoom level based on what it is
    var newCenter = this.refs.map.getCenter();
    var newZoom = this.refs.map.getZoom();
    // then call search based on new center coordinates
    this.props.search({
      latitude: newCenter.lat(),
      longitude: newCenter.lng()
    }, "mapChanged");

    this.setState({
      center: newCenter,
      zoom: newZoom
    });

  },
  handleZoom: function(){
    // on zoom set a new center and zoom level based on what it is
    var newCenter = this.refs.map.getCenter();
    var newZoom = this.refs.map.getZoom();
    // then call search based on new center coordinates
    this.props.search({
      latitude: newCenter.lat(),
      longitude: newCenter.lng()
    }, "mapChanged");

    this.setState({
      center: newCenter,
      zoom: newZoom
    });
  },
  handleMarkerClick: function(marker) {
    //on click, receive marker parse object and get its location
    var currentMarkerLocation = marker.get('location');
    // then set new center from the markers location property
    var newCenter = {
      lat: currentMarkerLocation.latitude,
      lng: currentMarkerLocation.longitude
    }
    // set zoom to 16 for close up on park, and center as newCenter
    this.setState({
      zoom: 16,
      center: newCenter
    });
    // set active marker to bubble up show list can highlight list item
    this.props.setActiveMarker(marker);
  },
  render: function(){
    // use initial state to set zoom and center
    var zoom = this.state.zoom;
    var center = this.state.center;

    // map over markers array
  var markers = this.state.markers.map(function(marker, index){
      // set counter to determine which icon to set
     var counter = index + 1;
      //
     var Icon = {
        url: "images/mapmarker" + counter + ".png"
     }
     // get parse location
     var markerLocation = marker.get("location");
     // start building new position object that is acceptable to google maps
     var position = {};
     position.lat = markerLocation.latitude;
     position.lng = markerLocation.longitude;
     // now set properties of the google map marker
     marker.icon = Icon;
     marker.position = position;
     marker.onClick = this.handleMarkerClick.bind(this, marker);
     // now return the google-maps-react component with those properties for each map
     return (
         <Marker
           {...marker}
         />
     )
   }.bind(this));

    return (
      <section style={{height: "525px"}}>

      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              height: "100%"
            }}
          />
        }
        googleMapElement={
         <GoogleMap
            onDrag={this.handleDrag}
            id="map"
            zoom={zoom}
            ref="map"
            center={center}
            onZoomChanged={this.handleZoom}
            defaultCenter={center}
          >
          {markers}
          </GoogleMap>
        }
      />
    </section>
    );
  }
});

var DynamicMapComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
  // Return early
    if(!this.props.park){
    <div>
      <h2>Loading...</h2>
      <i className="fa fa-spinner fa-spin fa-5x map-loading-spinner" aria-hidden="true"></i>
    </div>
    }
  return (
    <div className="">
      <ParkMap
        setActiveMarker={this.props.setActiveMarker}
        search={this.props.search}
        parks={this.props.parks}
        lat={this.props.lat}
        lng={this.props.lng}
      />
    </div>
    )
  }
});

module.exports = {
  DynamicMapComponent: DynamicMapComponent
}
