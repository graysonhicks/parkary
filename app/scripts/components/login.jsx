var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var LoginFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    return (
    <div className="container login-form-container">
      <form>
        <fieldset className="form-group login-form">
          <label className="form-label" htmlFor="login-username">username</label>
          <input type="text" className="form-control" id="login-username" />
        </fieldset>
        <fieldset className="form-group">
          <label className="form-label" htmlFor="login-password">password</label>
          <input type="password" className="form-control" id="login-password" />
        </fieldset>
        <fieldset className="form-group">
          <a className="login-signup-reminder" href="#signup">Don't have an account yet? Click here to sign up.</a>
        </fieldset>
        <button type="submit" id="login-form-submit-btn" className="btn btn-primary pull-right">login</button>
      </form>
    </div>
    )
  }
});

module.exports = {
  LoginFormComponent: LoginFormComponent
}
