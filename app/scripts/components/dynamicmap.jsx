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
     markers: [{
       position: {
         lat: 32.7765,
         lng: -79.9311,
       },
       key: 'one'
     },
     {
       position: {
         lat: 34.0007,
         lng: -81.0348,
       },
       key: 'two'
     },
     {
       position: {
         lat: 34.8526,
         lng: -82.3940,
       },
       key: 'three'
     },
     {
       position: {
         lat: -52.0112183,
         lng: -121.52067570000001,
       },
       key: 'four'
     }
   ]
    }
  },
  render: function(){
    
    var markers = this.state.markers.map(function(marker, index){
     marker.icon = Icon;
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
      <ParkMap location={this.props.location}/>
    </div>
    )
  }
});

module.exports = {
  DynamicMapComponent: DynamicMapComponent
}
