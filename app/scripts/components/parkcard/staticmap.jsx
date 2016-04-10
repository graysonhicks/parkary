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
       position: this.props.location,
       key: 'one'
     }]
    }
  },
  render: function(){
    console.log(this.props.location);
    var markers = this.state.markers.map(function(marker, index){
     marker.icon = Icon;

     return (
         <Marker
           {...marker}
         />
     )
   }.bind(this));

    return (
      <section style={{height: "255px"}}>
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
            defaultZoom={15}
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


var LocationComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
  return (

    <div className="">
      <ParkMap location={this.props.location} park={this.props.park}/>
    </div>
    )
  }
});


module.exports = {
  LocationComponent: LocationComponent
}
