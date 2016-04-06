var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var ReactCSSTransitionGroup = require('../../../node_modules/react-addons-css-transition-group');
var ParkTileComponent = require('./parktile.jsx').ParkTileComponent;
var Toggle = require('bootstrap-toggle');


var ParkGridComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
      var gridItem = function(park){
        return(
        <div key={park.id}>
          <ParkTileComponent currentPark={this.props.currentPark} park={park} />
        </div>
      )}
        return (
        <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <div className="row thumbnail-row">
            {this.props.parks.map(gridItem.bind(this))}
          </div>
        </ReactCSSTransitionGroup>
         )
        }
      });

module.exports = {
  ParkGridComponent: ParkGridComponent
}
