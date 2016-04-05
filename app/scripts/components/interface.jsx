var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');

var NavbarComponent = require('./navbar/navbar.jsx').NavbarComponent;
var LoginSignUpFormComponent = require('./forms/loginsignupform.jsx').LoginSignUpFormComponent;
var SearchFormComponent = require('./forms/searchform.jsx').SearchFormComponent;
var ParkGridComponent = require('./parkgrid.jsx').ParkGridComponent;
var ParkCardComponent = require('./parkcard/parkcard.jsx').ParkCardComponent;
var ProfileComponent = require('./profile.jsx').ProfileComponent;
var ParkMapComponent = require('./parkmap.jsx').ParkMapComponent;


Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var InterfaceComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
  return {
    router: this.props.router,
    user: null,
    parks: []
    }
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }).bind(this);
    this.state.router.on('route', this.callback);
   var currentUser = Parse.User.current();
      if (currentUser) {
        // do stuff with the user
        this.setState({'user': currentUser});
      }
  },
  componentWillUnmount: function(){
    this.state.router.off('route', this.callback);
  },
  setLocationObj: function(locationObj){
    var self = this;
    var parseGeo = new Parse.GeoPoint({latitude: locationObj.lat, longitude: locationObj.lng});
    (new Parse.Query('Parks')).withinMiles("location", parseGeo, 10).find({
      success: function(parks){
        console.log(parks);
        self.setState({
          "location": locationObj,
          "parks": parks
        })
      }
    })

  },
  signUp: function(userObj){
    var user = new Parse.User();
    user.set("username", userObj.username);
    user.set("password", userObj.password);
    user.set("email", userObj.email);
    user.signUp(null, {
      success: function(user) {
        this.setState({user: user});
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
      console.log(this.state.parks);
      body = (
        <SearchFormComponent
          parseLocationQuery={this.parseLocationQuery}
          setLocationObj={this.setLocationObj}
          page={this.state.router.current}
        />
      )
    }
    if(this.state.router.current == "parks"){
      body = (
        <ParkGridComponent
          parks={this.state.parks}
          page={this.state.router.current}
        />
      )
    }
    if(this.state.router.current == "map"){
      body = (
        <ParkMapComponent
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
        <ParkCardComponent page={this.state.router.current} />
      )
    }
    if(this.state.router.current == "profile"){
      body = (
        <ProfileComponent page={this.state.router.current} />
      )
    }
    return(
      <div>
       <NavbarComponent user={this.state.user} logout={this.logout} page={this.state.router.current} />
         {body}
      </div>
      )
    }
});
module.exports = {
  InterfaceComponent: InterfaceComponent
}
