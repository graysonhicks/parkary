var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');

var sorts = require('./sorts');
// Pulling in components
var NavbarComponent = require('./navbar/navbar.jsx').NavbarComponent;
var LoginSignUpFormComponent = require('./forms/loginsignupform.jsx').LoginSignUpFormComponent;
var SearchFormComponent = require('./forms/searchform.jsx').SearchFormComponent;
var ParkGridComponent = require('./parkgrid.jsx').ParkGridComponent;
var ParkCardComponent = require('./parkcard/parkcard.jsx').ParkCardComponent;
var ProfileComponent = require('./profilecard/profile.jsx').ProfileComponent;
var ParkMapComponent = require('./mapview/parkmap.jsx').ParkMapComponent;
var AddParkComponent = require('./forms/addpark.jsx').AddParkComponent;
var EditParkComponent = require('./forms/editpark.jsx').EditParkComponent;

Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var InterfaceComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    // getting router to track page and user and parks from query
  return {
    router: this.props.router,
    user: null,
    parks: [],
    mapview: null
    }
  },
  componentWillMount: function(){
    // forces page update on new routes
    this.callback = (function(){
      this.forceUpdate();
    }).bind(this);
    this.state.router.on('route', this.callback);
    // setting current user in state
   var currentUser = Parse.User.current();
      if (currentUser) {
        // do stuff with the user
        this.setState({'user': currentUser});
      }
  },
  componentWillUnmount: function(){
    // forces update on component unmounts
    this.state.router.off('route', this.callback);
  },
  sortHighestRated: function(e){
    e.preventDefault();
    var parks = sorts.rating(this.state.parks);
    this.setState({
      "parks": parks,
      "mapview": "rating"
    });
  },
  sortPopularity: function(e){
    e.preventDefault();
    var parks = sorts.popularity(this.state.parks);
    this.setState({
      "parks": parks,
      "mapview": "rating"
    });
  },
  sortDistance: function(e){
    e.preventDefault();
    var parks = sorts.distance(this.state.parks, this.state.mapCenter);
    this.setState({
      "parks": parks,
      "mapview": "distance"
    });
  },
  filterAmenity: function(addedAmenities){
    var self = this;
    var filterAmenities = addedAmenities;
    this.search(this.state.mapCenter, "mapChanged", filterAmenities);

  },
  search: function(center, type, filterAmenities){
    var self = this;
    // receiving type to determine where location is coming from and what format
    self.setState({"pending": true})
    var parseGeo;
    var noParks = false;
    // this only runs if there are no parks passed in in getInitialState
    // basically same function as setLocationObj, but is here in case someone navigates to results page by url only and doesnt use the search bar
    var self = this;
    // if a center is passed in from drag or zoom
    if(type === "mapChanged"){
      // make it the parseGeo
      parseGeo = center;
    } else if(type === "url"){
      // this else is for getting new center in case map is loaded using only the URL lat and lng
      parseGeo = {
        //self.props.lat and lng are passed through URL
        latitude: parseFloat(center.lat),
        longitude: parseFloat(center.lng)
      }
    } else if(type === "searchBar"){
      console.log('searchbar');
      parseGeo = {latitude: center.lat, longitude: center.lng};
    } else {
      console.log("location input error", center);
      return
    }
    parseGeo = new Parse.GeoPoint(parseGeo);
    // new query
    var parkQuery = new Parse.Query('Parks');
    parkQuery
      .withinMiles("location", parseGeo, 10)
      .include("reviews")
      .include("newAmenities")
      .limit(50);

    //Apply amentity filter

    console.log('addedAmenities', this.state.addedAmenities);


    if(filterAmenities){
      if(filterAmenities.length > 0){
         parkQuery.containsAll("newAmenities", filterAmenities);
      }
    }

    parkQuery.find({
      success: function(parks){
        console.log(parks);
        if(parks.length < 1){
          // search is complete and still no parks, set this flag in state so notice can be displayed
          noParks = true;
        }
        // otherwise, set returned parks in to state
        self.setState({
          "noParks": noParks,
          "parks": parks,
          "pending": false,
          "mapCenter": parseGeo
        })
      }
    })
  },
  mapUrl: function(){
    // used in GoogleSearchComponent, gets lat and lng from state (they are being set in state by the query in setLocationObj)
    // lets lat and lng in state and navigates to results with lat and lng in url
    var lat = this.state.mapCenter.latitude;
    var lng = this.state.mapCenter.longitude;
    console.log(lat);
    Backbone.history.navigate("parks/" + lat + "/" + lng, {trigger: true});
  },
  signUp: function(userObj){
    var user = new Parse.User();
    var newUser = {
      "firstname": userObj.firstname,
      "lastname": userObj.lastname,
      "username": userObj.username,
      "password": userObj.password,
      "email": userObj.email,
      "avatar": userObj.avatar
    }
    user.set(newUser);

    user.signUp(null, {
      success: function(user) {
        // set new role of basic user to user that signsup
        var roleACL = new Parse.ACL();
        var role = new Parse.Role("BasicUser", roleACL);
        role.getUsers().add(user);
        role.save();
        // set Parse User in state
        this.setState({user: user});
        // then navigate home
        Backbone.history.navigate('', {trigger: true});
      }.bind(this),
      error: function(user, error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
  },
  login: function(userObj){
    Parse.User.logIn(userObj.username, userObj.password, {
      success: function(user) {
        this.setState({user: user});
        this.forceUpdate();
        Backbone.history.navigate('', {trigger: true});
      }.bind(this),
      error: function(user, error) {
        console.log('failed login', user);
        console.log('failed login error: ', error );
      }
    });
  },
  logout: function(e){
    e.preventDefault();
    Parse.User.logOut().then(function(data, code, xhr){
      this.setState({'user': null});
    }.bind(this));
    Backbone.history.navigate('', {trigger: true});
  },
  render: function(){

    var body;
    if((this.state.router.current == "login")||(this.state.router.current == "signup")){
      body = (
        <LoginSignUpFormComponent login={this.login} signUp={this.signUp} page={this.state.router.current} />
      )
    }
    if(this.state.router.current == "search"){
      body = (
        <SearchFormComponent
          mapUrl={this.mapUrl}
          search={this.search}
          page={this.state.router.current}
          mapCenter={this.state.mapCenter}
          pending={this.state.pending}
        />
      )
    }
    if(this.state.router.current == "parks"){
      body = (
        <ParkGridComponent
          lat={this.props.router.lat}
          lng={this.props.router.lng}
          parks={this.state.parks}
          page={this.state.router.current}
          search={this.search}
          noParks={this.state.noParks}
          mapCenter={this.state.mapCenter}
        />
      )
    }
    if(this.state.router.current == "map"){
      body = (
        <ParkMapComponent
          lat={this.props.router.lat}
          lng={this.props.router.lng}
          mapCenter={this.state.mapCenter}
          parks={this.state.parks}
          search={this.search}
          page={this.state.router.current}
          mapview={this.state.mapview}
        />
      )
    }
    if(this.state.router.current == "home"){
      body = (
        <ParkGridComponent page={this.state.router.current} />
      )
    }
    if(this.state.router.current == "park"){
      body = (
        <ParkCardComponent
          parks={this.state.parks}
          parkId={this.state.router.parkId}
          page={this.state.router.current}
          user={this.state.user}
          router={this.state.router}
        />
      )
    }
    if(this.state.router.current == "profile"){
      body = (
        <ProfileComponent profileId={this.state.router.profileId} page={this.state.router.current} user={this.state.user}/>
      )
    }
    if(this.state.router.current == "add"){
      body = (
        <AddParkComponent page={this.state.router.current} />
      )
    }
    if(this.state.router.current == "edit"){
      body = (
        <EditParkComponent parkId={this.state.router.parkId} page={this.state.router.current} />
      )
    }
    return(
      <div>
       <NavbarComponent
         user={this.state.user}
         logout={this.logout}
         page={this.state.router.current}
         lat={this.props.router.lat}
         lng={this.props.router.lng}
         parks={this.state.parks}
         search={this.search}
         sortDistance={this.sortDistance}
         sortHighestRated={this.sortHighestRated}
         sortPopularity={this.sortPopularity}
         filterAmenity={this.filterAmenity}
         mapview={this.state.mapview}
        />
         {body}
      </div>
      )
    }
});
module.exports = {
  InterfaceComponent: InterfaceComponent
}
