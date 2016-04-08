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
    "profile": "profile",
    "park/(:id)": "park",
    "parks": "parks",
    "signup": "signup",
    "search": "search",
    "map/(:lat)(/:lng)": "map",
    "add": "add"
  },
  home: function(){
    console.log('home');
    this.current = "home";
  },
  login: function(){
    this.current = "login";
  },
  signup: function(){
    this.current = "signup";
  },
  profile: function(){
    this.current = "profile";
  },
  park: function(id){
    this.parkId = id;
    this.current = "park";
  },
  parks: function(){
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
  search: function(){
    console.log('search');
    this.current = "search";
  }

   });

module.exports = new Router();
