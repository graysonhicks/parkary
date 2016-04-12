var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Switch = require('react-bootstrap-switch');
var ReactCSSTransitionGroup = require('../../../../node_modules/react-addons-css-transition-group');
var Parse = require('parse');

var DynamicMapComponent = require('./dynamicmap.jsx').DynamicMapComponent;
var MapSidebarComponent = require('./mapsidebar.jsx').MapSidebarComponent;

Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var ParkMapComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    // get location from setLocationObj in interface and parks from query
    return {
      location: this.props.location,
      parks: this.props.parks,
      activeMarker: null
    }
  },
  componentWillMount: function(){
    // check if location has been set by searchbar, if not, do new query and set
    if(!this.state.location){
      this.search();
    }
  },
  setActiveMarker: function(marker){
    // on marker click, set that marker as the active marker so it can be highlighted in sidebar
    this.setState({
      activeMarker: marker
    })
  },
  search: function(center){
      var self = this;
      var parseGeo;
      // drag and zoom on map will pass this function a new center, so make a new parse GP from it
      if(center){
        parseGeo = new Parse.GeoPoint(center);

      } else {
        // this else is for getting new center in case map is loaded using only the URL lat and lng
        parseGeo = new Parse.GeoPoint({
          //self.props.lat and lng are passed through URL
          latitude: parseFloat(self.props.lat),
          longitude: parseFloat(self.props.lng)
        })
      }
      // new query if not done by search bar, because query is done in interface component if search bar is used
      (new Parse.Query('Parks')).withinMiles("location", parseGeo, 10).find({
        success: function(parks){
          self.setState({
            "location": {lat: parseFloat(self.props.lat), lng: parseFloat(self.props.lng)},
            "parks": parks
          })
        }
      })
  },
  render: function(){
        return (
        <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <div className="container map-container">
            <div className="panel panel-default">
              <div className="panel-body map-panel-body">
                <div className="col-md-9 map-column">
                  <DynamicMapComponent
                    search={this.search}
                    lat={this.props.lat}
                    lng={this.props.lng}
                    parks={this.state.parks}
                    setActiveMarker={this.setActiveMarker}
                  />
                </div>
                <div className="col-md-3">
                  <MapSidebarComponent
                    location={this.state.location}
                    parks={this.state.parks}
                    activeMarker={this.state.activeMarker}
                  />
                  </div>
                </div>
              </div>
            </div>
        </ReactCSSTransitionGroup>
         )
        }
      });

module.exports = {
  ParkMapComponent: ParkMapComponent
}
