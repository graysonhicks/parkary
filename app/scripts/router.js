var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');


var Router = Backbone.Router.extend({
  routes: {
    "": "search",
    "login": "login",
    "profile/(:id)": "profile",
    "park/(:id)": "park",
    "parks/(:lat)(/:lng)": "parks",
    "signup": "signup",
    "search": "search",
    "map/(:lat)(/:lng)": "map",
    "add": "add",
    "edit/(:id)": "edit"
  },
  login: function(){
    this.current = "login";
  },
  signup: function(){
    this.current = "signup";
  },
  profile: function(id){
    console.log("profile");
    this.profileId = id;
    this.current = "profile";
  },
  park: function(id){
    this.parkId = id;
    this.current = "park";
  },
  parks: function(lat, lng){
    this.lat = lat;
    this.lng = lng;
    this.current = "parks";
  },
  map: function(lat, lng){
    console.log('map');
    this.lat = lat;
    this.lng = lng;
    this.current = "map";
  },
  add: function(){
    console.log('add');
    this.current = "add";
  },
  edit: function(id){
    this.parkId = id;
    console.log('add');
    this.current = "edit";
  },
  search: function(){
    this.current = "search";
  }

   });

module.exports = new Router();
