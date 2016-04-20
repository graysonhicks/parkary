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

var UserReviewComponent = React.createClass({
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
    var userReview = function(review){
      return(
      <div className="review">
        <div className="row">
          <div className="col-md-2">
            <img src="images/fbook.jpg"></img>
          </div>
          <div className="col-md-10">
            <div className="row">
              <span>{review.get("title")}</span>
              <span className="review-date">January 29, 2016</span>
            </div>
            <div className="row">
              <span>
                <Rater className="park-stars park-card-stars" interactive={false} rating={review.get("rating")} />
               </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="review-content">{review.get("content")}</p>
          </div>
        </div>
      </div>
    )
    }
    // map over reviews
    return (
          <div className="container">
            <span className="reviews-heading">My Reviews ({reviews.length})</span>
            {reviews.map(userReview.bind(this))}
          </div>

      )
    }
  });

module.exports = {
  UserReviewComponent: UserReviewComponent
}
