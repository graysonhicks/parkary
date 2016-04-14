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

    // Return early if park not received yet
    if(!this.props.user){
      return(
      <div>
        <h4>Loading...</h4>
        <i className="fa fa-spinner fa-spin fa-2x reviews-loading-spinner" aria-hidden="true"></i>
      </div>
    )
    }
    // If there are still no reviews after the query has set the state, show that there are none
    if(!favorites){
      return(<div>You don't have any favorites yet.</div>)
    }
    // mapped review with fields set
      var userFavorite = function(favorite){
        console.log('favorite', favorite);

          var favoriteImages = favorite.get("images");
          var favoriteImage = favoriteImages[0];
        // Check how many favorites
          var numberOfFavorites = favorites.length;
          var numberOfGridColumns;
        // Determine number of grid columns
          numberOfGridColumns = (12 / numberOfFavorites)
          if(numberOfGridColumns < 3){
            numberOfGridColumns = 3;
          }


        return(
            <div className={"favorite-images-columns col-xs-6 col-md-" + numberOfGridColumns}>
                <a href="#" onMouseOver={this.hover} onMouseLeave={this.leave} className="thumbnail">
                  <div className="favorite-thumbnail">
                    <img className="favorite-image" src={favoriteImage.url()} alt="..." />
                  </div>
                </a>
            </div>
       )
      }

    // map over favorites
    console.log('favorites array', favorites);
    return (
        <div className="favorites-grid">
          <span className="reviews-heading">Favorites ({favorites.length})</span>
          <div className="row">
            {favorites.map(userFavorite.bind(this))}
          </div>
          <a className="all-reviews-link all-favorites-link">See all favorites...</a>
        </div>

      )
    }
  });

module.exports = {
  UserFavoritesComponent: UserFavoritesComponent
}
