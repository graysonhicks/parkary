var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var Parse = require('parse');


var SignUpFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  handleChange: function(e){
    var self = this;
    e.preventDefault();
    // grabs file from input
    var file = e.target.files[0];
    // set unique file name
    var name = this.state.username + Date.now() + ".jpg";
    // pass in name and file that is passed in to function above
    var image = new Parse.File(name, file);
    // push image to array
    image.save().then(function(file){
      self.setState({"avatar": file});
    });
  },
  signUp: function(e){
    e.preventDefault();
    // this function builds the new user object, but then passes it up to interface to actually sign up and be set in state
    var self = this;
    var newUser = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        avatar: this.state.avatar
    }
    this.props.signUp(newUser);
  },
  resetState: function(){
    this.setState({
      firstname: '',
      lastname: '',
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
          <label className="form-label" htmlFor="signup-firstname">first name</label>
          <input type="text" valueLink={this.linkState('firstname')} className="form-control" id="signup-firstname" />
        </fieldset>
        <fieldset className="form-group login-form">
          <label className="form-label" htmlFor="signup-lastname">last name</label>
          <input type="text" valueLink={this.linkState('lastname')} className="form-control" id="signup-lastname" />
        </fieldset>
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
        <fieldset className="form-group add-park-form">
          <label className="form-label" htmlFor="signup-image">profile picture</label>
            <input onChange={this.handleChange} type="file" className="form-control" id="signup-image" />
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
