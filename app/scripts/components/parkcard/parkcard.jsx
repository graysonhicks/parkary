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
	        park: null,
          favorite: null
	    };
	},
  componentWillMount: function(){
    var self = this;
    // Get users favorites to see if heart icon should show favorited
    var userFavorite = this.props.user.get("favorites");
    if(!userFavorite){
      userFavorite = [];
    }
    userFavorite = userFavorite.filter(function(favorite){
      if(favorite.id === self.props.parkId){
        self.setState({
          "favorite": true
        })
      }
    });
    // new query based on clicked on park, using parkId that is passed down through router
    var query = new Parse.Query("Parks");
    query.include("amenities");
    query.get(this.props.parkId).then(function(park){
      // then set location of park as google map marker location format to show park on parkcard map
      var markerLocation = park.get("location");
      var position = {};
      position.lat = markerLocation.latitude;
      position.lng = markerLocation.longitude;
      // set location and current parse park object in state
      this.setState({
        "park": park,
        "location": position
      });
    }.bind(this));
  },
  toggleFavorite: function(){
    var user = this.props.user;
    if(!this.state.favorite){
      console.log('add');
      user.add("favorites", this.state.park);
      user.save();
      this.setState({
        "favorite": true
      })

    } else {
      console.log('remove');
      user.remove("favorites", this.state.park);
      user.save();
      this.setState({
        "favorite": false
      })
    }
  },
  render: function(){
  // Return early
  if(!this.state.park){
    return (<LoadingComponent />)
  }
  console.log(this.state.park);
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
                    <ParkCardInfoComponent toggleFavorite={this.toggleFavorite} favorite={this.state.favorite} park={this.state.park}/>
                  </div>
                </div>
               </div>
               <div className="container-fluid">
                 <div className="row bottom-park-card-row">
                   <ReviewsComponent park={this.state.park}/>
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
