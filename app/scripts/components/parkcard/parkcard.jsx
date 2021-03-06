var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');

var LocationComponent = require('./staticmap.jsx').LocationComponent;
var ParkImageCarouselComponent = require('./parkimagecarousel.jsx').ParkImageCarouselComponent;
var FullParkImageCarouselComponent = require('./fullcarousel.jsx').FullParkImageCarouselComponent;
var ParkCardInfoComponent = require('./parkcardinfo.jsx').ParkCardInfoComponent;
var ReviewsComponent = require('./reviews.jsx').ReviewsComponent;
var LoadingComponent = require('./../loadingpanel.jsx').LoadingComponent;
var WarningModal = require('./../warningmodal.jsx').WarningModal;

var ParkCardComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function() {
	    return {
          favorite: null,
          showModal: false
	    };
	},
  componentWillMount: function(){
  var self = this;
  var query = (new Parse.Query(Parse.Role));
  if(Parse.User.current()){
    query.equalTo("name", "Administrator");
    query.equalTo("users", Parse.User.current());
    query.first().then(function(adminRole) {
        if (adminRole) {
          self.setState({"admin": true})
            console.log("user is an admin");
        } else {
            console.log("user is not an admin");
        }
    });
  }
    var self = this;
    // Get users favorites to see if heart icon should show favorited
    if(this.props.user){
      // set array of users favorites from parse
      var userFavorite = this.props.user.get("favorites");
    }

    if(!userFavorite){
      //if it is falsey, set as an empty array
      userFavorite = [];
    }
    // filter the array
    userFavorite = userFavorite.filter(function(favorite){
      //test if any of the parks in the parse array match the park current viewed
      if(favorite.id === self.props.parkId){
        //if so, set favorite state to true
        self.setState({
          "favorite": true
        })
      }
    });
    // new query based on clicked on park, using parkId that is passed down through router
    var query = new Parse.Query("Parks");
    query.include("amenities");
    query.include("newAmenities");

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
  openModal: function(){
    this.setState({
      showModal: true
    })
  },
  closeModal: function(){
    this.setState({
      showModal: false
    })
  },
  closeParkCard: function(e){
    e.preventDefault();
    var lat;
    var lng;
    var loc;
    if(this.props.router.lat){
      lat = this.props.router.lat;
      lng = this.props.router.lng;
    } else {
      loc = this.state.park.get("location");
      lat = loc.latitude;
      lng = loc.longitude;
    }

    Backbone.history.navigate("parks/" + lat + "/" + lng, {"trigger": true});
  },
  toggleFull: function(){
      this.setState({
        "fullCarousel": !this.state.fullCarousel
      })
  },
  toggleFavorite: function(){
    var user = this.props.user;
    // require a user to add favorites
    if(!user){
      this.setState({
        showModal: true
      })
      return;
    }
    //if the park isnt a favorite
    if(!this.state.favorite){
      console.log('add');
      //add to user favorites column
      user.add("favorites", this.state.park);
      user.save();
      // mark state as true
      this.setState({
        "favorite": true
      })
      //other wise do opposite
    } else {
      console.log('remove');
      user.remove("favorites", this.state.park);
      user.save();
      this.setState({
        "favorite": false
      })
    }
  },
  toggleAllReviews: function(){

    this.setState({
      "allReviews": !this.state.allReviews
    })
  },
  render: function(){
  // Return early
  var body;
  var goback;
  // will set map bigger if all reviews view is chosen
  var mapColumnsClass="col-md-6";
  if(this.state.allReviews){
    mapColumnsClass="col-md-12";
  }
  if(!this.state.park){
    return (<LoadingComponent />)
  }
  var modal;
  if(this.state.showModal){
    modal = (<WarningModal backdrop={true} show={this.state.showModal} closeModal={this.closeModal}/>)
  }
  if(this.state.fullCarousel){
    body=(<FullParkImageCarouselComponent toggleFull={this.toggleFull} park={this.state.park}/>);
    goback=(
    <div className="row">
      <div className="col-md-12">
        <div className="pull-right">
          <span className="go-back-btn">go back</span>
          <i onClick={this.toggleFull} className="fa fa-times close-park-card-btn"></i>
        </div>
      </div>
    </div>)
  }
  if(!this.state.fullCarousel){
        body=(
            <div>
              <i onClick={this.closeParkCard} className="pull-right fa fa-times close-park-card-btn"></i>
                <div className="panel-body">
                 <div className="container-fluid">
                   <div className="row top-park-card-row">
                      <div className="col-md-6 image-column">
                        <ParkImageCarouselComponent toggleFull={this.toggleFull} park={this.state.park}/>
                      </div>
                      <div className="col-md-6 info-column">
                        <ParkCardInfoComponent
                          admin={this.state.admin}
                          toggleFavorite={this.toggleFavorite}
                          page={this.props.page}
                          favorite={this.state.favorite}
                          park={this.state.park}
                        />
                      </div>
                    </div>
                    {modal}
                   </div>
                   <div className="container-fluid">
                     <div className="row bottom-park-card-row">
                       <ReviewsComponent
                         openModal={this.openModal}
                         park={this.state.park}
                         parkId={this.props.parkId}
                         user={this.props.user}
                         park={this.state.park}
                         toggleAllReviews={this.toggleAllReviews}
                         allReviews={this.state.allReviews}
                        />
                      <div className={"map-column " + mapColumnsClass}>
                       <LocationComponent
                         allReviews={this.state.allReviews}
                         location={this.state.location}
                         park={this.state.park}
                        />
                       </div>
                     </div>
                   </div>
                  </div>
                </div>
                )
        }
        return (
        <div className="container-fluid park-card-container">
          <div className="panel panel-default park-card center-block">
              {goback}
              {body}
            </div>
          </div>
               )
              }
            });

module.exports = {
  ParkCardComponent: ParkCardComponent
}
