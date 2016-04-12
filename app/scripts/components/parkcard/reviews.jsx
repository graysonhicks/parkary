var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var NewReviewComponent = require('./newreview.jsx').NewReviewComponent;
var ExistingReviewComponent = require('./existingreview.jsx').ExistingReviewComponent;

var ReviewsComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      addReview: false
    }
  },
  addReview: function(){
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

    if(this.state.addReview){
      body = (<NewReviewComponent park={this.props.park} cancelReview={this.cancelReview}/>)
    }
    if(!this.state.addReview) {
      body = (<ExistingReviewComponent park={this.props.park}/>)
    }
      return (
       <div className="col-md-6 reviews-column">
         <span className="reviews-heading">Reviews ({this.props.park.get("reviews").length})</span>
         <span className><a className="pull-right add-review-button" onClick={this.addReview}>Add your review...</a></span>
          {body}
       </div>

     )
      }
    });

module.exports = {
  ReviewsComponent: ReviewsComponent
}
