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

var ExistingReviewComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  componentWillMount: function(){
    // query reviews that go with current park
    var self = this;
    var query = new Parse.Query("Reviews").equalTo("parkId", this.props.park).find({
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
    var warning;
    var reviews = this.state.reviews;
    // Return early if park not received yet
    if(!this.props.park){
      return(
      <div>
        <h4>Loading...</h4>
        <i className="fa fa-spinner fa-spin fa-2x reviews-loading-spinner" aria-hidden="true"></i>
      </div>
    )
    }
    // If there are still no reviews after the query has set the state, show that there are none
    if(!reviews){
      return (<div>No reviews yet for this park!</div>)
    }
    if(reviews && reviews.length === 0){
      warning = (<div>No reviews yet for this park!</div>)
    }
    // mapped review with fields set
    var existingReview = function(review){
      var reviewPoster = review.get("userId").get("username");
      var posterAvatar = review.get("userId").get("avatar").url();
      return(
      <div className="review">
        <div className="row">
          <div className="col-md-2">
            <a href={"#profile/" + review.get("userId").id}><img src={posterAvatar}></img></a>
          </div>
          <div className="col-md-10">
            <div className="row">
              <a href={"#profile/" + review.get("userId").id}><span>{reviewPoster}</span></a>
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
            <span><h4>{review.get("title")}</h4></span>
            <p className="review-content">{review.get("content")}</p>
          </div>
        </div>
      </div>
    )
    }
    // map over reviews
    return (
          <div>
            {warning}
           {reviews.map(existingReview.bind(this))}
           <a className="all-reviews-link pull-right">See all reviews...</a>
          </div>

      )
    }
  });

module.exports = {
  ExistingReviewComponent: ExistingReviewComponent
}
