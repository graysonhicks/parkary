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
    if(nextProps.parks){
      this.setState({
        markers: nextProps.parks
      });
    }
  },
  handleDrag: function(){
    var newCenter = this.refs.map.getCenter();
    var newZoom = this.refs.map.getZoom();

    this.props.search({
      latitude: newCenter.lat(),
      longitude: newCenter.lng()
    });
    this.setState({
      center: newCenter,
      zoom: newZoom
    });

  },
  handleZoom: function(){
    var newCenter = this.refs.map.getCenter();
    var newZoom = this.refs.map.getZoom();
    this.props.search({
      latitude: newCenter.lat(),
      longitude: newCenter.lng()
    });
    this.setState({
      center: newCenter,
      zoom: newZoom
    });
  },
  handleMarkerClick: function(marker) {
    var currentMarkerLocation = marker.get('location');
    console.log(marker);
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
      var counter = index + 1;
      var Icon = {
        url: "images/mapmarker" + counter + ".png"
      }
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
    if(!this.props.park){
      <h1>loading</h1>
    }
  return (
    <div className="">
      <ParkMap
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
