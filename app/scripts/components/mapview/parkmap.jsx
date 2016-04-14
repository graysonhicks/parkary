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
    console.log(this.state.location);
    if(!this.state.location){
      this.props.search();
    }
  },
  setActiveMarker: function(marker){
    // on marker click, set that marker as the active marker so it can be highlighted in sidebar
    this.setState({
      activeMarker: marker
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
                    parks={this.props.parks}
                    search={this.props.search}
                    setActiveMarker={this.setActiveMarker}
                  />
                </div>
                <div className="col-md-3">
                  <MapSidebarComponent
                    location={this.state.location}
                    parks={this.props.parks}
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
