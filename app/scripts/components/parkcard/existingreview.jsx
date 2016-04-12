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
    var self = this;
    var query = new Parse.Query("Reviews").equalTo("parkId", this.props.park).find({
        success: function(results) {
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
    if(!this.props.park){
      return(<h1>Loading</h1>)
    }
    if(!reviews){
      return(<div>No reviews yet for this park!</div>)
    }
    console.log(reviews);
    var existingReview = function(review){
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

    return (
          <div>
          {reviews.map(existingReview.bind(this))}
           <a className="all-reviews-link pull-right">See all reviews...</a>
          </div>

      )
    }
  });

module.exports = {
  ExistingReviewComponent: ExistingReviewComponent
}
