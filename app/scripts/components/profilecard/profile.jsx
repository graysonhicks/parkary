var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');

var UserReviewComponent = require('./userreviews.jsx').UserReviewComponent;
var UserFavoritesComponent = require('./userfavorites.jsx').UserFavoritesComponent;

var ProfileComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    var user = this.props.user;
    var profilePicture = user.get("avatar").url();
    console.log(profilePicture);
        return (
        <div className="container-fluid profile-container">
          <div className="panel panel-default profile-card center-block">
            <i className="pull-right fa fa-times"></i>
            <div className="panel-body">
               <div className="container-fluid">
                 <div className="row">
                  <div className="col-md-4 image-column">
                      <img className="profile-card-image img-responsive center-block" src={profilePicture} alt="" />                               </div>
                  <div className="col-md-8 info-column">
                      <div className="col-md-6 username-and-location-container park-card-name-and-location-container">
                        <div className="user-card-name park-card-name">{user.get("firstname")} {user.get("lastname")}</div>
                        <div className="user-card-location park-card-location">{user.get("username")}</div>
                      </div>
                      <div className="col-md-6 profile-social-container">
                        <div className="user-card-social-icons park-card-social-icons">
                          <i className="fa fa-envelope social-icons"></i>
                          <i className="fa fa-twitter-square social-icons"></i>
                          <i className="fa fa-facebook-official social-icons"></i>
                        </div>
                      </div>
                      <div className="col-md-12 profile-description park-card-description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                      </div>
                    </div>
                  </div>
                 </div>
               <div className="container-fluid">
                 <div className="row">
                   <div className="col-md-4 reviews-column">

                     <UserReviewComponent user={this.props.user} />

                   </div>
                   <div className="col-md-8 profile-favorites-column">
                     <UserFavoritesComponent user={this.props.user} />
                   </div>
                 </div>
               </div>
              </div>
            </div>
          </div>
               )
              }
            });

module.exports = {
  ProfileComponent: ProfileComponent
}
