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
var Switch = require('react-bootstrap-switch');
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
      this.props.search({
        lat: this.props.lat,
        lng: this.props.lng
      }, "url");
    }
  },
  toggle: function(state){
    // on switch change, it is call toggle
    // if its false, set location from url and navigate to parks grid view with lat and lng
    console.log(state);
    if(state === false){
      var lat = this.props.lat;
      var lng = this.props.lng;
      Backbone.history.navigate("parks/" + lat + "/" + lng, {trigger: true});
    }
    // if its true, set location from url and navigate to map view with lat and lng
    else {
      var lat = this.props.lat;
      var lng = this.props.lng;
      Backbone.history.navigate("map/" + lat + "/" + lng, {trigger: true});
    }
  },
  render: function(){
    var toggleSwitch;
      if((this.props.page =="parks")||(this.props.page =="map")){
        // using switchState and labelText to handle the map/grid toggle switch
        var switchState;
        var labelText;
        // on the parks page
        if(this.props.page == "parks"){
          // change switch state and labelText
          switchState = false;
          labelText = "GRID";
        }
        // opposite for map page
        if(this.props.page == "map"){
          switchState = true;
          labelText = "MAP";
        }
      }
    // if the noParks flag has been set true after search function, then notify user
    if(this.props.noParks){
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
            {this.props.parks.map(gridItem.bind(this))}
          </div>
        </ReactCSSTransitionGroup>
         )
        }
      });

module.exports = {
  ParkGridComponent: ParkGridComponent
}
