var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var Parse = require('parse');

var AddedEditedUserModal = require('./addedediteduser.jsx').AddedEditedUserModal;

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
        bio: this.state.bio,
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
  openModal: function(){
    this.setState({
      showModal: true
    })
  },
  closeModal: function(){
    this.setState({
      showModal: false
    })
    Backbone.history.navigate("", {trigger: true});
  },
  render: function(){
    var modal;

    if(this.props.newUser){
      return (
        <AddedEditedUserModal page={this.props.page} className="add-change-warning-modal" backdrop={true} closeButton={false} show={this.props.newUser} closeModal={this.closeModal}/>
      )
    }

    return (
    <div>
      <div className="container signup-form-container fade-in">
        <h3 className="form-label text-center">sign up</h3>
        <form id="signup-form" onSubmit={this.signUp}>
          <div className="col-md-4">
            <fieldset className="form-group login-form">
              <label className="form-label" htmlFor="signup-firstname">first name</label>
              <input type="text" valueLink={this.linkState('firstname')} className="form-control" id="signup-firstname" />
            </fieldset>
            <fieldset className="form-group login-form">
              <label className="form-label" htmlFor="signup-lastname">last name</label>
              <input type="text" valueLink={this.linkState('lastname')} className="form-control" id="signup-lastname" />
            </fieldset>
          </div>
          {modal}
          <div className="col-md-4">
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
          </div>
          <div className="col-md-4">
            <fieldset className="form-group add-park-form">
              <label className="form-label" htmlFor="signup-image">profile picture</label>
                <input onChange={this.handleChange} type="file" className="form-control" id="signup-image" />
            </fieldset>
            <fieldset className="form-group add-park-form">
              <label className="form-label" htmlFor="signup-bio">short bio</label>
                 <textarea className="form-control" valueLink={this.linkState('bio')} rows="5" id="signup-bio"></textarea>
            </fieldset>
          </div>
        </form>
      </div>
      <div className="signup-btn-and-link-container">
        <a className="login-signup-reminder" href="#login">Already have an account? Click here to login.</a>
        <button form="signup-form" type="submit" id="login-form-submit-btn" className="btn btn-primary">sign up</button>
      </div>
    </div>
    )
  }
});

module.exports = {
  SignUpFormComponent: SignUpFormComponent
}
