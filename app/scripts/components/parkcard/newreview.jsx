var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var Parse = require('parse');
var Rater = require('react-rater').default;
var ReactCSSTransitionGroup = require('../../../../node_modules/react-addons-css-transition-group');

Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var NotLoggedInComponent = require('./../notloggedin.jsx').NotLoggedInComponent;

var NewReviewComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    // form fields for adding a new review
    return {
        userId: Parse.User.current().get("username"),
        title: "",
        content: "",
        rating: 0,
        parkId: this.props.park,
        interactive: true
    }
  },
  addRating: function(rating, lastRating){
    // this handles mouse overs, hovers, and clicks, setRating function below will set it
    this.setState({
      "rating": rating
    })
  },
  setRating: function(e){
    e.preventDefault();
    // turns off interaction so latest rating is stored in state, mouse over and hover are removed
    this.setState({
      "interactive": false
    })
  },
  editRating: function(e){
    e.preventDefault();
    // on edit rating button click, rater made interactive again so rating may be set again
    this.setState({
      "interactive": true
    })
  },
  handleSubmit: function(e){
    e.preventDefault();
    // on submit, start new review model
    var Review = Parse.Object.extend("Reviews");
    var review = new Review();
    // get current park
    var park = this.props.park;
    // current user
    var user = Parse.User.current();
    // get date to add to review
    var date = Date.now();
    // current average rating that is stored on park in Parse
    var averageParkRating = park.get("rating");
    // running total of ratings added together so that it can be divided by number of reviews for average
    var aggregateParkRating = park.get("aggregateRating");

    // track number of reviews
    var currentNumberOfReviews;
    // if there are existing reviews on park
    if(park.get("reviews").length){
      // set to current number, but add one to account for this review we are building to add
      currentNumberOfReviews = (park.get("reviews").length) + 1;
    } else {
      // otherwise set as one, since there were none, but now will be this one we are building
      currentNumberOfReviews = 1
    }
    // if the park rating is undefined
    if(!averageParkRating){
      // set both at zero instead of undefined
      averageParkRating = 0;
      aggregateParkRating = 0;
    }

    // add the current rating being made to the aggregateRating
    aggregateParkRating = aggregateParkRating + this.state.rating;
    // set the average ratings
    // take new aggregate and divide by the number of reviews(now includes this one)
    averageParkRating = parseFloat(aggregateParkRating / currentNumberOfReviews).toFixed(2);

    // build basic review data object
    var newReviewData = {
      userId: Parse.User.current(),
      title: this.state.title,
      content: this.state.content,
      rating: this.state.rating,
      parkId: this.props.park,
      date: date
    }
    // set park rating as the new average
    park.set("rating", averageParkRating);
    // set park aggregate as the new aggregate
    park.set("aggregateRating", aggregateParkRating);

    // set review with new review data
    review.set(newReviewData);
    // save the review
    review.save(null, {
      success:function(newReview) {
        // on success, add the new review to the park's reviews array
        park.add("reviews", newReview);
        // add review to users reviews array
        user.add("reviews", newReview);
        // then save the park
        park.save();
      },
      error:function(obj, error) {
        console.log(error);
      }
    });
  },
  render: function(){
    var editRatingButton;
    // Warn if not logged in
    if(!Parse.User.current()){
      return(<NotLoggedInComponent />)
    }
    // if rating has been set, show option to edit the rating
    if(!this.state.interactive){
      editRatingButton = (<span onClick={this.editRating} className="pull-right edit-rating-button">Edit Rating <i className="fa fa-pencil" onClick={this.editRating} aria-hidden="true"></i></span>)
    }
    return (
    <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      <div className="row">
        <div className="col-md-12">
          <form className="add-review-form" onSubmit={this.handleSubmit}>
            <fieldset className="form-group">
              <label htmlFor="review-title">Title</label>
              <input type="text" valueLink={this.linkState('title')} className="form-control" id="review-title" placeholder="Review title" />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="review-content">Review</label>
              <textarea valueLink={this.linkState('content')} className="form-control" id="review-content" rows="5"></textarea>
            </fieldset>
            <fieldset>
              {editRatingButton}
              <Rater interactive={this.state.interactive} onClick={this.setRating} rating={this.state.rating} onRate={this.addRating} className="new-review-stars"/>
            </fieldset>
            <button type="submit" className="btn btn-success pull-right">Submit Review</button>
            <button className="btn btn-danger pull-right" onClick={this.props.cancelReview}>Cancel</button>
         </form>
       </div>
     </div>
    </ReactCSSTransitionGroup>
        )
              }
            });

module.exports = {
  NewReviewComponent: NewReviewComponent
}
