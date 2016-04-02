var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');


var Router = Backbone.Router.extend({
  routes: {
    "": "home",
    "login": "login",
    "profile": "profile",
    "park": "park",
    "parks": "parks",
    "signup": "signup",
    "search": "search",
    "map": "map"
  },
  home: function(){
    console.log('home');
    this.current = "home";
  },
  login: function(){
    console.log('login');
    this.current = "login";
  },
  signup: function(){
    console.log('signup');
    this.current = "signup";
  },
  profile: function(){
    console.log('profile');
    this.current = "profile";
  },
  park: function(){
    console.log('park');
    this.current = "park";
  },
  parks: function(){
    console.log('park');
    this.current = "parks";
  },
  map: function(){
    console.log('map');
    this.current = "map";
  },
  search: function(){
    console.log('search');
    this.current = "search";
  }

   });

module.exports = new Router();
