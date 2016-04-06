var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Switch = require('react-bootstrap-switch');
var ReactCSSTransitionGroup = require('../../../../node_modules/react-addons-css-transition-group');

var DynamicMapComponent = require('./dynamicmap.jsx').DynamicMapComponent;
var MapSidebarComponent = require('./mapsidebar.jsx').MapSidebarComponent;

var ParkMapComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
        return (
        <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <div className="container map-container">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="col-md-9 map-column">
                  <DynamicMapComponent parks={this.props.parks} location={this.props.location} />
                </div>
                <div className="col-md-3">
                  <MapSidebarComponent location={this.props.location} parks={this.props.parks}/>
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
