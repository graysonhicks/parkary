var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var WarningModal = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  handleSignUp: function(e){
    e.preventDefault();
    Backbone.history.navigate("#signup", {trigger: true});
  },
  handleLogin: function(e){
    e.preventDefault();
    Backbone.history.navigate("#login", {trigger: true});
  },
  render: function(){
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
                <h3 className="not-logged-in-heading">Sorry!</h3>
                <p>You must log in or sign up to do this!</p>
                <p>Please click <a href="#" id="warning-signup" onClick={this.handleSignUp}>here</a> to sign up or <a href="#" id="warning-login" onClick={this.handleLogin}>here</a> to login.</p>
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
  WarningModal: WarningModal
}
