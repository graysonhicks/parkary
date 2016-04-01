var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');


var SignUpFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  signUp: function(e){
    e.preventDefault();
    // console.log(this.state);
    this.resetState();
    this.props.signUp(this.state);
  },
  resetState: function(){
    this.setState({
      username: '',
      email: '',
      password: ''
    });
  },
  render: function(){

    return (
    <div className="container signup-form-container fade-in">
      <form onSubmit={this.signUp}>
        <fieldset className="form-group login-form">
          <label className="form-label" htmlFor="signup-username">username</label>
          <input type="text" valueLink={this.linkState('username')} className="form-control" id="signup-username" />
        </fieldset>
        <fieldset className="form-group">
          <label className="form-label" htmlFor="signup-email">email</label>
          <input type="email" valueLink={this.linkState('email')} className="form-control" id="signup-email" />
        </fieldset>
        <fieldset className="form-group">
          <label className="form-label" htmlFor="signup-password">password</label>
          <input type="password" valueLink={this.linkState('password')} className="form-control" id="signup-password" />
        </fieldset>
        <fieldset className="form-group">
          <a className="login-signup-reminder" href="#login">Already have an account? Click here to login.</a>
        </fieldset>
        <button type="submit" id="login-form-submit-btn" className="btn btn-primary pull-right">sign up</button>
      </form>
    </div>
    )
  }
});

module.exports = {
  SignUpFormComponent: SignUpFormComponent
}
