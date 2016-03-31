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
    "signup": "signup",
    "search": "search"
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
  search: function(){
    console.log('search');
    this.current = "search";
  }

   });

module.exports = new Router();
