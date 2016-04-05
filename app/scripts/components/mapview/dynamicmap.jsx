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
     markers: this.props.parks
    }
  },
  render: function(){

    var markers = this.state.markers.map(function(marker, index){
     var markerLocation = marker.get("location");
     console.log(this.props.location);
     var position = {}
     position.lat = markerLocation.latitude;
     position.lng = markerLocation.longitude;
     console.log(position);
     marker.icon = Icon;
     marker.position = position;
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
              height: "100%",
            }}
          />
        }
        googleMapElement={
         <GoogleMap
            defaultZoom={12}
            defaultCenter={this.props.location}
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