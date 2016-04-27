var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');

var NewReviewComponent = require('./newreview.jsx').NewReviewComponent;
var ExistingReviewComponent = require('./existingreview.jsx').ExistingReviewComponent;

var ReviewsComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    // addReview determines to show or hide add review form
    return {
      addReview: false
    }
  },
  componentWillMount: function(){

    var query = new Parse.Query("Parks");
    query.include("reviews");
    query.include("reviews.userId")
    query.get(this.props.parkId).then(function(park){
      // set location and current parse park object in state
      this.setState({
        "reviews": park.get("reviews")
      });
    }.bind(this));

  },
  addReview: function(){
    if(!Parse.User.current()){
      this.props.openModal();
      return;
    }

    this.setState({
      addReview: true
    })
  },
  cancelReview: function(){
    this.setState({
      addReview: false
    })
  },

  render: function(){
    var body;
    var currentNumberOfReviews;
    // will add class for scroll overflow when all reviews are displayed
    var columnsClass = "col-md-6 reviews-column";

    // if there are reviews, set numebr
    if(this.props.park.get("reviews").length){
      currentNumberOfReviews = this.props.park.get("reviews").length;
    } else {
      // else set at zero to avoid error
      currentNumberOfReviews = 0;
    }
    // if adding review, show form
    if(this.state.addReview){
      body = (<NewReviewComponent
        allReviews={this.props.allReviews}
        park={this.props.park}
        cancelReview={this.cancelReview}
      />)
    }
    //else show existing reviews
    if(!this.state.addReview) {
      body = (<ExistingReviewComponent
        toggleAllReviews={this.props.toggleAllReviews}
        allReviews={this.props.allReviews}
        reviews={this.state.reviews}
        park={this.props.park}
      />)
    }
    if(this.props.allReviews){
      columnsClass = "col-md-12 reviews-column all";
    }
      return (
       <div className={columnsClass}>
         <span className="reviews-heading">Reviews ({currentNumberOfReviews})</span>
         <span className><a className="pull-right add-review-button" onClick={this.addReview}>Add your review...</a></span>
          {body}
       </div>

     )
      }
    });

module.exports = {
  ReviewsComponent: ReviewsComponent
}
