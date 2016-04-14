var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');

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
    parks: []
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
  setLocationObj: function(locationObj){
    // receives info from google places api
    var self = this;
    // sets state as pending to contol input bar and search button during query
    self.setState({"pending": true})
    // new parse geopoint using lat and lng from locationObj
    var parseGeo = new Parse.GeoPoint({latitude: locationObj.lat, longitude: locationObj.lng});
    // new location query using parse geopoint
    (new Parse.Query('Parks')).withinMiles("location", parseGeo, 10).find({
      success: function(parks){
        // then keep locationobj in state, set parks from query in state, and change pending to false for search button
        self.setState({
          "location": locationObj,
          "parks": parks,
          "pending": false
        })
      }
    })
  },
  mapUrl: function(){
    // used in GoogleSearchComponent, gets lat and lng from state (they are being set in state by the query in setLocationObj)
    // lets lat and lng in state and navigates to results with lat and lng in url
    var lat = this.state.location.lat;
    var lng = this.state.location.lng;
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
          setLocationObj={this.setLocationObj}
          page={this.state.router.current}
          location={this.state.location}
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
        />
      )
    }
    if(this.state.router.current == "map"){
      body = (
        <ParkMapComponent
          lat={this.props.router.lat}
          lng={this.props.router.lng}
          location={this.state.location}
          parks={this.state.parks}
          page={this.state.router.current}
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
        />
         {body}
      </div>
      )
    }
});
module.exports = {
  InterfaceComponent: InterfaceComponent
}
