var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var LoginDropdownComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    var dropdown;
    // if there is a user
    // show profile and logout options on dropdown
    if(this.props.user){
      dropdown = (
        <ul id="login-dropdown" className="dropdown-menu">
          <li><a className="dropdown-menu-links" href="#profile">profile</a></li>
          <li onClick={this.props.logout}><a className="dropdown-menu-links" href="#">logout</a></li>
        </ul>
      )
    }
    // if no user logged in, only show login option in dropdown 
    else {
      dropdown = (
        <ul id="login-dropdown" className="dropdown-menu">
          <li><a className="dropdown-menu-links" href="#login">login</a></li>
        </ul>
      )
    }
    return (
      <li className="dropdown">
        <a href="#" id="account-link" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">account <span className="caret"></span>
        </a>
          {dropdown}
      </li>
          )
        }
      });

module.exports = {
  LoginDropdownComponent: LoginDropdownComponent
}
