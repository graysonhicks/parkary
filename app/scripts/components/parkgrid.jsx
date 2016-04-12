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
    // set parks from query into state
    return {
      parks: this.props.parks
    }
  },
  componentDidMount: function(){
    // if the array is empty, make sure search has been return
    // this is in case someone navigates by url only and no search bar is used with the google geocode
    if(this.state.parks.length < 1){
      this.search();
    }
  },
  search: function(){
    // this only runs if there are no parks passed in in getInitialState
    // basically same function as setLocationObj, but is here in case someone navigates to results page by url only and doesnt use the search bar
    var self = this;
    // new geopoint from lat and lng in url
    var parseGeo = new Parse.GeoPoint({
        latitude: parseFloat(self.props.lat),
        longitude: parseFloat(self.props.lng)
      });
    // new query
    (new Parse.Query('Parks')).withinMiles("location", parseGeo, 10).find({
      success: function(parks){
        console.log(parks);
        if(parks.length < 1){
          // search is complete and still no parks, set this flag in state so notice can be displayed
          self.setState({
            "noParks": true
          });
        }
        // otherwise, set returned parks in to state
        self.setState({
          "parks": parks
        })
      }
    })
  },
  render: function(){
    // if the noParks flag has been set true after search function, then notify user
    if(this.state.noParks){
      return (
              <div className="container-fluid park-card-container">
                <div className="panel panel-default center-block loading-panel">
                  <div className="panel-body loading-panel-body">
                    <h2>Sorry!</h2>
                    <p>No parks found.</p>
                  </div>
                </div>
              </div>)
    }
      var gridItem = function(park){
        return(
        <div key={park.id}>
          <ParkTileComponent park={park} />
        </div>
      )}
      // map over parks (either passed in through props or set in this.search function)
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
