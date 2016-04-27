var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var DeleteReviewModal = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  deleteReview: function(){
    var self = this;
    var newAverageParkRating;
    var newAggregateParkRating;
    var park = this.props.park;
    var review = this.props.review;
    var reviewUser = review.get("userId");
    var deletedReviewRating = review.get("rating");
    var oldAverageParkRating = park.get("rating");

    var oldAggregateParkRating = park.get("aggregateRating");

    var currentNumberOfReviews;

    currentNumberOfReviews = (park.get("reviews").length) - 1;

    newAggregateParkRating = oldAggregateParkRating - deletedReviewRating;
    newAverageParkRating = parseFloat(newAggregateParkRating / currentNumberOfReviews).toFixed(2);
    if(currentNumberOfReviews === 0){
      newAverageParkRating = "0";
    }
    park.set("rating", newAverageParkRating);
    // set park aggregate as the new aggregate
    park.set("aggregateRating", newAggregateParkRating);
    reviewUser.remove("reviews", review);
    park.remove("reviews", review);
    review.destroy({});
    park.save(null, {
      success:function(updatedPark) {
        self.setState({
          "deleted": true
        })
      },
      error:function(obj, error) {
        console.log(error);
      }
    });

  },
  render: function(){
    var body;
    var button;
    if(this.state.deleted){
      body = (
          <div className="not-logged-in-container">
            <h3 className="not-logged-in-heading">Okay!</h3>
            <p>Alright, it's gone!</p>
          </div>
      )
    } else {
      body=(
          <div className="not-logged-in-container">
            <h3 className="not-logged-in-heading">Are you sure?</h3>
            <p>Are you sure you want to delete this review? This can't be undone!</p>
          </div>
            )
      button= (
         <Button className="btn-danger" onClick={this.deleteReview}>Delete</Button>
       )
    }
    return (
        <div className="static-modal warning-modal">
          <Modal.Dialog>
            <Modal.Body>

                {body}

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.closeModal}>Close</Button>
              {button}
            </Modal.Footer>

          </Modal.Dialog>
        </div>
        )
      }
    });

module.exports = {
  DeleteReviewModal: DeleteReviewModal
}
