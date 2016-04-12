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
    this.setState({
      "rating": rating
    })
  },
  setRating: function(e){
    e.preventDefault();
    this.setState({
      "interactive": false
    })
  },
  editRating: function(e){
    e.preventDefault();
    this.setState({
      "interactive": true
    })
  },
  handleSubmit: function(e){
    e.preventDefault();
    var Review = Parse.Object.extend("Reviews"); //move to model file
    var review = new Review();
    var park = this.props.park;
    var date = Date.now()
    var averageParkRating = park.get("rating");
    var aggregateParkRating = park.get("aggregateRating");
    var currentNumberOfReviews;

    if(park.get("reviews").length){
      currentNumberOfReviews = (park.get("reviews").length) + 1;
      console.log('currentNumberOfReviews', currentNumberOfReviews);
    } else {
      currentNumberOfReviews = 1
    }
    if(!averageParkRating){
      averageParkRating = 0;
      aggregateParkRating = 0;
    }
    console.log('currentNumberOfReviews', currentNumberOfReviews);
    console.log('aggregateParkRatingBefore', aggregateParkRating);
    console.log('currentRating', this.state.rating);
    console.log('added together', aggregateParkRating + this.state.rating);
    console.log('currentNumberOfReviews', currentNumberOfReviews);
    aggregateParkRating = aggregateParkRating + this.state.rating;
    averageParkRating = parseFloat(aggregateParkRating / currentNumberOfReviews).toFixed(2);
    console.log('aggregateParkRating', aggregateParkRating);
    console.log('averageParkRating', averageParkRating);


    var newReviewData = {
      userId: Parse.User.current(),
      title: this.state.title,
      content: this.state.content,
      rating: this.state.rating,
      parkId: this.props.park,
      date: date
    }
    park.set("rating", averageParkRating);
    park.set("aggregateRating", aggregateParkRating)
    review.set(newReviewData);
    review.save(null, {
      success:function(newReview) {
        park.add("reviews", newReview);
        park.save();
        console.log(park);
      },
      error:function(obj, error) {
        console.log(error);
      }
    });
  },
  render: function(){
    var editRatingButton;
    if(!Parse.User.current()){
      return(<NotLoggedInComponent />)
    }
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
