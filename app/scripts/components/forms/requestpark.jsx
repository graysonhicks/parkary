var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var ReactCSSTransitionGroup = require('../../../../node_modules/react-addons-css-transition-group');
var Parse = require('parse');
var ParseReact = require('parse-react');

var WarningModal = require('./../warningmodal.jsx').WarningModal;
var AddedEditedModal = require('./parkaddededitedmodal.jsx').AddedEditedModal;

Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var RequestParkComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  requestPark: function(e){
    var self = this;
    e.preventDefault();
    var requestData = this.state;
    requestData.userId = Parse.User.current().id;
    requestData.date = Date.now();

    var Request = Parse.Object.extend("Requests");
    var request = new Request();

    request.set(requestData); // let geopoint location
    //Save
    request.save(null, {
      success:function(newRequest) {
        console.log(newRequest);
        self.setState({
          "requestMade": true
        })
      },
      error:function(obj, error) {
        console.log(error);
      }
    });
  },
  closeModal: function(){
    console.log('close');
    this.setState({
      "requestMade": false
    })
    Backbone.history.navigate("", {trigger: true});
  },
  componentWillMount: function(){
    this.props.handleRequest();
  },
  render: function(){
      var modal;
      if(this.state.requestMade){
        return (
          <AddedEditedModal className="add-edit-success-modal add-change-warning-modal" backdrop={true} closeButton={false} requestMade={this.state.requestMade} show={this.state.requestMade} closeModal={this.closeModal}/>
        )
      }
      if(this.props.showWarningModal){
        return (
          <WarningModal className="add-change-warning-modal" backdrop={true} closeButton={false} show={this.state.showModal} closeModal={this.props.closeWarningModal}/>)
      } else {
    return (
        <div>
          <div className="container signup-form-container fade-in">
            <h3 className="form-label text-center">add / edit a park</h3>
            <form id="signup-form" onSubmit={this.requestPark}>
              <div className="col-md-6">
                <fieldset className="form-group login-form">
                  <label className="form-label" htmlFor="signup-firstname">park name</label>
                  <input type="text" valueLink={this.linkState('name')} className="form-control" id="signup-firstname" />
                </fieldset>
                <fieldset className="form-group login-form">
                  <label className="form-label" htmlFor="signup-lastname">park location</label>
                  <input type="text" valueLink={this.linkState('location')} className="form-control" id="signup-lastname" />
                </fieldset>
                <fieldset className="form-group add-park-form">
                  <div className="col-md-6">
                    <label className="add-park-form-checkbox-labels">
                      <input type="checkbox" checkedLink={this.linkState('add')} /> request for add
                    </label>
                  </div>
                  <div className="col-md-6">
                    <label className="add-park-form-checkbox-labels">
                      <input type="checkbox" checkedLink={this.linkState('edit')} /> request for edit
                    </label>
                  </div>
                </fieldset>
              </div>
              <div className="col-md-6">
                <fieldset className="form-group add-park-form">
                  <label className="form-label" htmlFor="signup-bio">comments</label>
                     <textarea className="form-control" valueLink={this.linkState('comments')} rows="5" id="signup-bio"></textarea>
                </fieldset>
              </div>
            </form>
          </div>
          <div className="signup-btn-and-link-container fade-in">
            <button form="signup-form" type="submit" id="login-form-submit-btn" className="btn btn-primary">send request</button>
          </div>
        </div>
    )
   }
  }
  });

  module.exports = {
    RequestParkComponent: RequestParkComponent
  }
