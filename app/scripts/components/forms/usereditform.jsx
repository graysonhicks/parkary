var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var Parse = require('parse');


var EditUserComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
      username: this.props.user.get("username"),
      email: this.props.user.get("email"),
      firstname: this.props.user.get("firstname"),
      lastname: this.props.user.get("lastname"),
      avatar: this.props.user.get("avatar")

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
    this.props.user.set(newUser);
    this.props.user.save(null, {
      success:function(updatedUser) {
        console.log(updatedUser);
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
  render: function(){
    var mainImage;
    var mainImageUrl;
    if(this.state.avatar){
      mainImage = this.state.avatar;
      mainImageUrl = mainImage.url();
    } else {
      mainImage = this.props.user.get("avatar");
      mainImageUrl = mainImage.url();
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
