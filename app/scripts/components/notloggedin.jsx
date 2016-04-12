var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var NotLoggedInComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  handleSignUp: function(e){
    e.preventDefault();
    Backbone.history.navigate("#signup", {trigger: true});
  },
  handleLogin: function(e){
    e.preventDefault();
    Backbone.history.navigate("#login", {trigger: true});
  },
  render: function(){
    return (
      <div className="not-logged-in-container">
        <h3 className="not-logged-in-heading">Sorry! <i className="fa fa-times pull-right" aria-hidden="true"></i></h3>
        <p>You must log in or sign up to do this!</p>
        <p>Please click <a href="#" onClick={this.handleSignUp}>here</a> to sign up or <a href="#" onClick={this.handleLogin}>here</a> to login.</p>
      </div>
        )
              }
            });

module.exports = {
  NotLoggedInComponent: NotLoggedInComponent
}
