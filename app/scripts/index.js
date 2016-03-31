window.jQuery = $ = require('jquery');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var bootstrap = require('bootstrap-sass/assets/javascripts/bootstrap.js');
var router = require('./router.js');

var InterfaceComponent = require('./components/interface.jsx').InterfaceComponent;

$(function(){
  Backbone.history.start();

  ReactDOM.render(
    React.createElement(InterfaceComponent, {
      router: router
    }),
    document.getElementById('main-container')
    );



});
