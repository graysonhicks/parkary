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
    (this.props.review).destroy({});
    this.setState({
      "deleted": true
    })
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
