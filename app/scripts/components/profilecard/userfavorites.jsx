var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');
var ParseReact = require('parse-react');
var Rater = require('react-rater').default;

Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var UserFavoritesComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  componentWillMount: function(){
    // query reviews that go with current park
    var self = this;
    var query = new Parse.Query("Reviews").equalTo("userId", this.props.user).find({
        success: function(results) {
          // set them in state
          self.setState({
            "reviews": results
          });
        },
        error: function(error) {
          console.log(error);
        }
      })
  },
  render: function(){
    var reviews = this.state.reviews;
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
    if(!reviews){
      return(<div>You don't have any reviews yet.</div>)
    }
    // mapped review with fields set
    var userFavorite = function(review){
      return(

                  <div className="review">
                    <div className="row">
                      <div className="col-md-2">
                        <img src="images/park2.jpg"></img>
                      </div>
                      <div className="col-md-10">
                        <div className="row">
                          <span className="favorite-name">McPherson Park</span>
                        </div>
                        <div className="row">
                          <span className="pull-right">
                            <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                            <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                            <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                           </span>
                        </div>
                      </div>
                    </div>
                  </div>

    )
    }
    // map over reviews
    console.log(reviews);
    return (
          <div>
              <span className="reviews-heading">Favorites (5)</span>
            {reviews.map(userFavorite.bind(this))}
           <a className="all-reviews-link pull-right">See all favorites...</a>
          </div>

      )
    }
  });

module.exports = {
  UserFavoritesComponent: UserFavoritesComponent
}
