var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');

var LocationComponent = require('./staticmap.jsx').LocationComponent;
var ParkImageCarouselComponent = require('./parkimagecarousel.jsx').ParkImageCarouselComponent;
var ParkCardInfoComponent = require('./parkcardinfo.jsx').ParkCardInfoComponent;
var ReviewsComponent = require('./reviews.jsx').ReviewsComponent;
var LoadingComponent = require('./../loadingpanel.jsx').LoadingComponent;

var ParkCardComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function() {
	    return {
	        park: null
	    };
	},
  componentWillMount: function(){
    var query = new Parse.Query("Parks");
    query.include("amenities");
    query.get(this.props.parkId).then(function(park){
       var markerLocation = park.get("location");
       var position = {};
       position.lat = markerLocation.latitude;
       position.lng = markerLocation.longitude;
      this.setState({
        "park": park,
        "location": position
      });
    }.bind(this));
  },
  render: function(){
  if(!this.state.park){
    return (<LoadingComponent />)
  }
        return (
        <div className="container-fluid park-card-container">
          <div className="panel panel-default park-card center-block">
            <i className="pull-right fa fa-times"></i>
            <div className="panel-body">
             <div className="container-fluid">
               <div className="row top-park-card-row">
                  <div className="col-md-6 image-column">
                    <ParkImageCarouselComponent park={this.state.park}/>
                  </div>
                  <div className="col-md-6 info-column">
                    <ParkCardInfoComponent park={this.state.park}/>
                  </div>
                </div>
               </div>
               <div className="container-fluid">
                 <div className="row bottom-park-card-row">
                   <ReviewsComponent />
                   <div className="col-md-6 map-column">
                   <LocationComponent location={this.state.location} park={this.state.park}/>
                   </div>
                 </div>
               </div>
              </div>
            </div>
          </div>
               )
              }
            });

module.exports = {
  ParkCardComponent: ParkCardComponent
}
