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
    return {
      location: this.props.location,
      parks: this.props.parks
    }
  },
  componentWillMount: function(){
    // check if location has been set by searchbar, if not, do new query and set
    if(!this.state.location){
      var self = this;
      var parseGeo = new Parse.GeoPoint({
        latitude: parseFloat(self.props.lat),
        longitude: parseFloat(self.props.lng)
      });
      // new query if not done by search bar
      (new Parse.Query('Parks')).withinMiles("location", parseGeo, 10).find({
        success: function(parks){
          self.setState({
            "location": {lat: parseFloat(self.props.lat), lng: parseFloat(self.props.lng)},
            "parks": parks
          })
        }
      })
    }
  },
  render: function(){
        return (
        <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <div className="container map-container">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="col-md-9 map-column">
                  <DynamicMapComponent
                    lat={this.props.lat}
                    lng={this.props.lng}
                    parks={this.state.parks}
                  />
                </div>
                <div className="col-md-3">
                  <MapSidebarComponent
                    location={this.state.location}
                    parks={this.state.parks}
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
