var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var AddedEditedModal = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  handleSignUp: function(e){
    e.preventDefault();
    Backbone.history.navigate("#signup", {trigger: true});
  },
  render: function(){
    var requestText;
    if(this.props.requestMade){
      requestText = " to the request queue"
    }
    return (
        <div className="static-modal warning-modal">
          <Modal.Dialog>
            <Modal.Header className="warning-modal-header">
                <span>
                    <a id="warning-treelogocontainer" href="#"><img id="warning-treelogo-login" src="images/treelogo.png" /></a>
                </span>
                <span>
                   <a href="#" id="warning-parkary-name">
                     <span id="warning-parkbold">park</span><span id="warning-parklight">ary</span>
                   </a>
                </span>
            </Modal.Header>
            <Modal.Body>
              <div className="not-logged-in-container">
                <h3 className="not-logged-in-heading">Thanks!</h3>
                <p>Park has been added{requestText}!</p>
                <p>Please click <a href="#" onClick={this.props.addAgain} id="warning-signup">here</a> to add another park or <a href="#" id="warning-login">here</a> to go back.</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.closeModal}>Close</Button>
            </Modal.Footer>

          </Modal.Dialog>
        </div>
        )
      }
    });

module.exports = {
  AddedEditedModal: AddedEditedModal
}
