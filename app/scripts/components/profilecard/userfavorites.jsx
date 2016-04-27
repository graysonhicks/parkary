var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');
var ParseReact = require('parse-react');
var Rater = require('react-rater').default;
var Overlay = require('react-bootstrap').Overlay;

Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var UserFavoritesComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      "favorites": this.props.user.get("favorites"),
      "hover": false
    }
  },
  hover: function(e){
    var target = $(e.target);
    target.toggleClass("hover");
    this.setState({
      "hover": true
    })
  },
  leave: function(e){
    var target = $(e.target);
    target.toggleClass("hover");
    this.setState({
      "hover": false
    })
  },
  render: function(){
    var hoverState = this.state.hover;
    var favorites = this.state.favorites;
    var full = "";
    var goback = "";
    var favoriteBtnText = "see all favorites...";
    // Return early if park not received yet
    if(!this.props.user){
      return(
      <div>
        <h4>Loading...</h4>
        <i className="fa fa-spinner fa-spin fa-2x reviews-loading-spinner" aria-hidden="true"></i>
      </div>
    )
    }
    if(this.props.fullFavorites){
      full = " full";
      favoriteBtnText = "go back..."
      goback= (
        <span>
          <i onClick={this.props.toggleFull} className="pull-right fa fa-times close-profile-card-btn"></i>
          <span className="pull-right go-back-btn">go back</span>
        </span>
      );
    }
    // If there are still no reviews after the query has set the state, show that there are none
    if(!favorites){
      return(<div>You don't have any favorites yet.</div>)
    }
    // mapped review with fields set
      var userFavorite = function(favorite, index){
        // only show first four favorites
        if(!this.props.fullFavorites){
          if(index > 1){
            return;
          }
        }
        var favoriteImages;
        var favoriteImage;
        var favoriteImageUrl;
        if(favorite.get("images").length < 1){
          favoriteImageUrl = "images/noimagenotice.png";
        } else {
          favoriteImages = favorite.get("images");
          favoriteImage = favoriteImages[0];
          favoriteImageUrl = favoriteImage.url();
        }

        // Check how many favorites
          var numberOfFavorites = favorites.length;
          var numberOfGridColumns;
        // Determine number of grid columns
          numberOfGridColumns = (12 / numberOfFavorites)
          if(numberOfGridColumns < 3){
            numberOfGridColumns = 3;
          }
        return(
            <div key={index} className={"favorite-images-columns col-md-6"}>
                <a href={"#park/" + favorite.id} onMouseOver={this.hover} onMouseLeave={this.leave} className="favorite-park-thumbnail thumbnail">
                  <div className={"favorite-thumbnail" + full}>
                    <img className={"favorite-image" + full} src={favoriteImageUrl} alt="..." />
                  </div>
                  <span className="favorite-park-name">{favorite.get("name")}</span>
                </a>
            </div>
       )
      }
    // map over favorites
    return (
        <div>
          {goback}
            <div className="panel-body">
               <div className="container-fluid">
                <div className="favorites-grid">
                  <span className="reviews-heading">Favorites ({favorites.length})</span>
                  <div className="row">
                    {favorites.map(userFavorite.bind(this))}
                  </div>
                  <a onClick={this.props.toggleFull} className="all-reviews-link all-favorites-link pull-right">{favoriteBtnText}</a>
                </div>
              </div>
            </div>
          </div>

      )
    }
  });

module.exports = {
  UserFavoritesComponent: UserFavoritesComponent
}
