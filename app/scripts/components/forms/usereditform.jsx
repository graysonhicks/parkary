var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var Parse = require('parse');

var WarningModal = require('./../warningmodal.jsx').WarningModal;

var EditUserComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  componentWillMount: function(){
    // if user gets to this endpoint but isnt logged in, start modal
      if(!this.props.user){
        this.setState({"showModal": true})
        return
      }
      //otherwise prefill form with their info
      this.setState({
        username: this.props.user.get("username"),
        email: this.props.user.get("email"),
        firstname: this.props.user.get("firstname"),
        lastname: this.props.user.get("lastname"),
        avatar: this.props.user.get("avatar")
      })
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
    // save new image and set it as their avatar
    image.save().then(function(file){
      self.setState({"avatar": file});
    });
  },
  editUser: function(e){
    e.preventDefault();
    // this function builds the new user object, but then passes it up to interface to actually sign up and be set in state
    var self = this;
    var newUser = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        avatar: this.state.avatar
    }
    // set user
    this.props.user.set(newUser);
    //save user
    this.props.user.save(null, {
      success:function(updatedUser) {
        console.log(updatedUser);
        // flag the state to trigger modal
        self.setState({
          "userEdited": true
        })
      },
      error:function(obj, error) {
        console.log(error);
      }
    });
  },
  resetState: function(){
    this.setState({
      firstname: '',
      lastname: '',
      email: ''
    });
  },
  closeModal: function(){
    //close modal and navigate home
    this.setState({
      showModal: false
    })
    Backbone.history.navigate("", {trigger: true});
  },
  render: function(){
    var mainImage;
    var mainImageUrl;
    // modal catches here
    if(this.state.showModal){
      return (
        <WarningModal className="add-change-warning-modal" backdrop={true} closeButton={false} show={this.state.showModal} closeModal={this.closeModal}/>)
    }
    //if the user already has an avatar user it
    if(this.state.avatar){

      mainImage = this.state.avatar;
      mainImageUrl = mainImage.url();
    } else {
      //or use default
      mainImageUrl = "images/fbook.jpg";
    }

    return (
    <div className="container signup-form-container edit-user-form fade-in">
      <h3 className="edit-user-form-heading">update your profile</h3>
      <form onSubmit={this.editUser}>
        <div className="col-md-6">
          <fieldset className="form-group login-form">
            <label className="form-label" htmlFor="signup-firstname">first name</label>
            <input type="text" valueLink={this.linkState('firstname')} className="form-control" id="signup-firstname" />
          </fieldset>
          <fieldset className="form-group login-form">
            <label className="form-label" htmlFor="signup-lastname">last name</label>
            <input type="text" valueLink={this.linkState('lastname')} className="form-control" id="signup-lastname" />
          </fieldset>
          <fieldset className="form-group">
            <label className="form-label" htmlFor="signup-email">email</label>
            <input type="email" valueLink={this.linkState('email')} className="form-control" id="signup-email" />
          </fieldset>
        </div>
        <div className="col-md-6">
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="signup-image">profile picture</label>
            <img src={mainImageUrl}></img>
              <input onChange={this.handleChange} type="file" className="form-control" id="signup-image" />
          </fieldset>
          <button type="submit" id="login-form-submit-btn" className="btn btn-primary pull-right">update user</button>
        </div>
      </form>
    </div>
    )
  }
});

module.exports = {
  EditUserComponent: EditUserComponent
}
