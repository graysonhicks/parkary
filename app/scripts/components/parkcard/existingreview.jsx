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

var DeleteReviewModal = require('./deletereview.jsx').DeleteReviewModal;

var ExistingReviewComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      reviews: this.props.reviews
    }
  },
  componentWillMount: function(){
    this.setState({
      "reviews": this.props.reviews
    })
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({
      "reviews": nextProps.reviews
    })
  },
  deleteReview: function(){
    console.log('deleted');
  },
  openModal: function(){
    console.log('open');
    this.setState({
      showModal: true
    })
  },
  closeModal: function(){
    this.setState({
      showModal: false
    })
  },
  render: function(){
    var modal;
    var warning;
    var deleteButton;
    var reviews = this.state.reviews;
    var allReviewsBtnText;
    var reviewColumns = "";
    // Return early if park not received yet
    if(!this.props.reviews){
      return(
      <div>
        <h4>Loading...</h4>
        <i className="fa fa-spinner fa-spin fa-2x reviews-loading-spinner" aria-hidden="true"></i>
      </div>
    )
    }
    //If there are still no reviews after the query has set the state, show that there are none
    if(!reviews){
      return (<div>No reviews received!</div>)
    }
    if(reviews && reviews.length === 0){
      warning = (<div>No reviews yet for this park!</div>)
    }
    if(this.props.allReviews){
      allReviewsBtnText = "Hide reviews...";
      reviewColumns = "col-md-6 all-reviews-review-item";
    } else {
      allReviewsBtnText = "Show all reviews...";
    }

    // mapped review with fields set
    var existingReview = function(review, index){
      if(!this.props.allReviews){
        if(index > 2){
          return;
        }
      }

      if(this.state.showModal){
        modal = (<DeleteReviewModal backdrop={true} review={review} show={this.state.showModal} closeModal={this.closeModal}/>)
      }

      if(Parse.User.current()){
        if(review.get("userId").id === Parse.User.current().id){
          console.log("Match");
          deleteButton = (
              <i onClick={this.openModal} className="fa fa-times pull-right delete-review-btn"></i>
          )
        }
      }

      var posterAvatar;
      if(review.get("userId").get("avatar")){
        posterAvatar = review.get("userId").get("avatar").url();
      } else {
        posterAvatar = "images/fbook.jpg";
      }
      var reviewPoster = review.get("userId").get("username");

      return(
      <div key={index} className={"review " + reviewColumns}>
        <div className="row">
          <div className="col-md-2">
            <a href={"#profile/" + review.get("userId").id}><img src={posterAvatar}></img></a>
          </div>
          <div className="col-md-10">
            <div className="row">
              <a className="review-username parkcard" href={"#profile/" + review.get("userId").id}><span>{reviewPoster}</span></a>
              <span className="review-date">January 29, 2016</span>
              {deleteButton}
            </div>
            <div className="row">
              <span>
                <Rater className="park-stars park-card-stars" interactive={false} rating={review.get("rating")} />
               </span>
            </div>
          </div>
          {modal}
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
           <a onClick={this.props.toggleAllReviews} className="all-reviews-link pull-right">{allReviewsBtnText}</a>
          </div>

      )
    }
  });

module.exports = {
  ExistingReviewComponent: ExistingReviewComponent
}
