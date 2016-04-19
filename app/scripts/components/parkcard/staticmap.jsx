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

// basic map marker icon
var Icon = {
  url: "images/mapmarker.png"
}

var ParkMap = React.createClass({
 getInitialState: function(){
   // need an array of markers for this google react maps plugin to work so setting here as just one in array
   return {
     markers: [{
       position: this.props.location,
       key: 'one'
     }],
     center: this.props.location
    }
  },
  handleResize: function(){
    console.log('resize');
    this.forceUpdate();
  },
  render: function(){
    var mapStyle;
    // map over array and set icon
    var markers = this.state.markers.map(function(marker, index){
     marker.icon = Icon;
     // return marker component and stored in markers var
     return (
         <Marker
           {...marker}
         />
     )
   }.bind(this));
   if(this.props.allReviews){
     mapStyle = {
        height: "100%",
        width:"100%"
      }
   } else {
     mapStyle = {height: "100%"}
   }
    return (
      <section style={{height: "255px"}}>
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={mapStyle}
          />
        }
        googleMapElement={
         <GoogleMap
            style={mapStyle}
            onReSize={this.handleResize}
            defaultZoom={15}
            defaultCenter={this.state.center}
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
      <ParkMap allReviews={this.props.allReviews} location={this.props.location} park={this.props.park}/>
    </div>
    )
  }
});


module.exports = {
  LocationComponent: LocationComponent
}
