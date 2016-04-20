var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');

var UserReviewComponent = require('./userreviews.jsx').UserReviewComponent;
var UserFavoritesComponent = require('./userfavorites.jsx').UserFavoritesComponent;
var LoadingComponent = require('./../loadingpanel.jsx').LoadingComponent;
var SocialIconsComponent = require('./../parkcard/socialicons.jsx').SocialIconsComponent;

var ProfileComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  componentWillMount: function(){

    var query = new Parse.Query("User");
    query.include("favorites");
    query.get(this.props.profileId).then(function(user){
      // set location and current parse park object in state
      console.log(user);
      this.setState({
        "user": user
      });
    }.bind(this));

  },
  closeProfileCard: function(e){
    e.preventDefault();
    Backbone.history.navigate("", {"trigger": true});
  },
  toggleFull: function(){
    this.setState({
      "fullFavorites": !this.state.fullFavorites
    })
  },
  render: function(){
    if(!this.state.user){
      return(<LoadingComponent />)
    }
    var body;
    var user = this.state.user;
    var profilePicture = user.get("avatar").url();
    //if full favorites grid chosen, display full card grid
    if(this.state.fullFavorites){
      body=( <UserFavoritesComponent toggleFull={this.toggleFull} fullFavorites={this.state.fullFavorites} profileId={this.props.profileId} user={this.props.user} />)
    }
    //if full favorites grid not chosen, display normal profile card
    if(!this.state.fullFavorites){
      body=(
  <div>
    <i onClick={this.closeProfileCard} className="pull-right fa fa-times close-profile-card-btn"></i>
      <div className="panel-body">
         <div className="container profile-container">
           <div className="row">
                <div className="col-md-12 image-column">
                  <img className="profile-card-image img-responsive center-block" src={profilePicture} alt="" />                             </div>
              </div>
            <div className="row">
              <div className="col-md-12 info-column">
                  <div className="username-and-location-container park-card-name-and-location-container">
                    <div className="user-card-name park-card-name">{user.get("firstname")} {user.get("lastname")}</div>
                    <div className="user-card-location park-card-location">{user.get("username")}</div>
                  </div>
                  <div className="profile-social-container">
                    <SocialIconsComponent
                      page={this.props.page}
                      park={this.props.park}
                      toggleFavorite={this.props.toggleFavorite}
                      favorite={this.props.favorite}
                      user={this.props.user}
                    />
                  </div>
                  <div className="col-md-12 profile-description park-card-description">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </div>
              </div>
           </div>
           <div className="row">
             <div className="col-md-12 reviews-column">
               <UserReviewComponent user={this.props.user} />
               <a className="all-reviews-link pull-right">see all reviews...</a>
             </div>
           </div>
           <div className="row">
             <div className="col-md-12 profile-favorites-column">
               <UserFavoritesComponent
                 toggleFull={this.toggleFull}
                 profileId={this.props.profileId}
                 park={this.props.park}
                 user={this.props.user}
                />
             </div>
             </div>
           </div>
         </div>

      )
    }
        return (
        <div className="container-fluid profile-container">
          <div className="panel panel-default profile-card center-block">
              {body}
            </div>
          </div>
               )
              }
            });

module.exports = {
  ProfileComponent: ProfileComponent
}
