var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var LoginFormComponent = require('./login.jsx').LoginFormComponent;
var SignUpFormComponent = require('./signup.jsx').SignUpFormComponent;

var LoginSignUpFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    var form;
    if(this.props.page == "login"){
      form = (
        <LoginFormComponent />
      )
    }
    if(this.props.page == "signup"){
      form = (
        <SignUpFormComponent />
      )
    }
    return (
    <div>
      {form}
    </div>

    )
  }
});

module.exports = {
  LoginSignUpFormComponent: LoginSignUpFormComponent
}
