var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var ReactCSSTransitionGroup = require('../../../../node_modules/react-addons-css-transition-group');
var Parse = require('parse');
var ParseReact = require('parse-react');

Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var RequestParkComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
        username: "",
        park: "",
        add: null,
        edit: null,
        location: "",
        comments: ""

    }
  },
  render: function(){
    return (
      <div>

      </div>
    )
  }
  });

  module.exports = {
    RequestParkComponent: RequestParkComponent
  }
