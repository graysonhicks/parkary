var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var ReactCSSTransitionGroup = require('../../../node_modules/react-addons-css-transition-group');
var ParkTileComponent = require('./parktile.jsx').ParkTileComponent;
var Toggle = require('bootstrap-toggle');
var Parse = require('parse');

var ParkGridComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      parks: this.props.parks
    }
  },
  componentDidMount: function(){
        if(this.state.parks.length < 1){
          this.search();
        }
  },
  search: function(){
    var self = this;
    var parseGeo = new Parse.GeoPoint({
        latitude: parseFloat(self.props.lat),
        longitude: parseFloat(self.props.lng)
      });

    (new Parse.Query('Parks')).withinMiles("location", parseGeo, 10).find({
      success: function(parks){
        console.log(parks);
        if(parks.length < 1){
          self.setState({
            "noParks": true
          });
        }
        self.setState({
          "parks": parks
        })
      }
    })
  },
  render: function(){
    if(this.state.noParks){
      return (<h1>Sorry, no parks found!</h1>)
    }
      var gridItem = function(park){
        return(
        <div key={park.id}>
          <ParkTileComponent park={park} />
        </div>
      )}
        return (
        <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <div className="row thumbnail-row">
            {this.state.parks.map(gridItem.bind(this))}
          </div>
        </ReactCSSTransitionGroup>
         )
        }
      });

module.exports = {
  ParkGridComponent: ParkGridComponent
}
