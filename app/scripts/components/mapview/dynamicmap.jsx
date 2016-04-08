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


var Icon = {
  url: "images/mapmarker.png"
}

var ParkMap = React.createClass({
  getInitialState: function(){
   return {
     markers: this.props.parks,
     zoom: 12,
     center: this.props.location
    }
  },
  handleMarkerClick: function(marker) {
    var currentMarkerLocation = marker.get('location');
    console.log(currentMarkerLocation);
    var newCenter = {
      lat: currentMarkerLocation.latitude,
      lng: currentMarkerLocation.longitude
    }
    this.setState({
      zoom: 16,
      center: newCenter
    });
  },
  render: function(){
  var zoom = this.state.zoom;
  var center = this.state.center;
  var markers = this.state.markers.map(function(marker, index){
     var markerLocation = marker.get("location");
     var position = {};
     position.lat = markerLocation.latitude;
     position.lng = markerLocation.longitude;
     marker.icon = Icon;
     marker.position = position;
     marker.onClick = this.handleMarkerClick.bind(this, marker);
     return (
         <Marker
           {...marker}
         />
     )
   }.bind(this));
   console.log(center);
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
            zoom={zoom}
            ref="map"
            center={center}
            onCenterChanged={this.handleMapCenterChanged}
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
  return (
    <div className="">
      <ParkMap parks={this.props.parks} location={this.props.location}/>
    </div>
    )
  }
});

module.exports = {
  DynamicMapComponent: DynamicMapComponent
}
