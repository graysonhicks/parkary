var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

//this is used on login, sign up and logout, the logout call is located in the interface

var AddedEditedUserModal = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    var dialogText;
    var redirectText;
    if(this.props.page === "signup"){
      dialogText = "You have been signed up!";
    }
    if(this.props.page === "login"){
      dialogText = "You're logged in!";
    }
    if(this.props.userLogoutSuccess){
      dialogText = "You're all logged out, see you next time!";
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
                <p>Thanks! {dialogText}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.closeModal}>Go Back</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
        )
      }
    });

module.exports = {
  AddedEditedUserModal: AddedEditedUserModal
}
