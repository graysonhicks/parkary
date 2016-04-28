var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');
var ParseReact = require('parse-react');

var WarningModal = require('./../warningmodal.jsx').WarningModal;
var UserRequestsComponent = require('./userrequests.jsx').UserRequestsComponent;

var AdminPageComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  componentWillMount: function(){
    var self = this;
    var query = (new Parse.Query(Parse.Role));
    if(!Parse.User.current()){
      self.setState({"showModal": true})
    }
    if(Parse.User.current()){
      query.equalTo("name", "Administrator");
      query.equalTo("users", Parse.User.current());
      query.first().then(function(adminRole) {
          if (adminRole) {
            		var Users = Parse.Object.extend("User");
            		var userQuery = new Parse.Query( Users );
                // query all possible amenities and set in state for mapping and rendering
            		userQuery.count({
                  success: function(number) {
                  self.setState({
                    "allUsers": number
                  })
                  },
                error: function(error) {
                // error is an instance of Parse.Error.
                }
                });
              	var Parks = Parse.Object.extend("Parks");
            		var parkQuery = new Parse.Query( Parks );
                // query all possible amenities and set in state for mapping and rendering
            		parkQuery.count({
                  success: function(number) {
                    self.setState({
                      "allParks": number
                    })
                  },
                error: function(error) {
                // error is an instance of Parse.Error.
                }
                });
              	var Requests = Parse.Object.extend("Requests");
            		var requestQuery = new Parse.Query( Requests );
                // query all possible amenities and set in state for mapping and rendering
            		requestQuery.count({
                  success: function(number) {
                    self.setState({
                      "allRequests": number
                    })
                  },
                error: function(error) {
                // error is an instance of Parse.Error.
                }
                });
          } else {
              self.setState({"showModal": true})
              console.log("user is not an admin");
          }
      });
    }

  },
  openModal: function(){
    this.setState({
      showModal: true
    })
  },
  closeModal: function(){
    this.setState({
      showModal: false
    })
    Backbone.history.navigate("", {trigger: true});
  },
  handleRequests: function(){
    this.setState({
      "requestsView": !this.state.requestsView
    })
  },
  render: function(){
    var requests;
    var modal;

    if(this.state.showModal){
      return (
        <WarningModal className="add-change-warning-modal" backdrop={true} closeButton={false} show={this.state.showModal} closeModal={this.closeModal}/>)
    }
    if(!this.state.allUsers){
      return(
        <span>Loading...</span>
      )
    }
    if(!this.state.allParks){
      return(
        <span>Loading...</span>
      )
    }
    if(!this.state.allRequests){
      return(
        <span>Loading...</span>
      )
    }
    if(this.state.requestsView){

      requests = (
        <UserRequestsComponent />

      )
    }
    return (

      <div className="container">
        {modal}
       <div className="row">
         <div className="col-md-12 admin-btns-column">
           <button type="button" className="admin-btns btn btn-secondary-outline">
             <a className="admin-btn-links" href="#add">Add a Park</a>
           </button>
           <button type="button" className="admin-btns btn btn-secondary-outline" disabled>
             <a className="admin-btn-links" href="#edit">Edit a Park</a>
           </button>
           <button type="button" className="admin-btns btn btn-secondary-outline">
             <a className="admin-btn-links" onClick={this.handleRequests}>User Requests</a>
           </button>
         </div>
       </div>
       <div className="row">
         <div className="col-md-5 admin-stats-column">
           <h2 className="admin-stats">Total Users: {this.state.allUsers}</h2>
           <h2 className="admin-stats">Total Parks: {this.state.allParks}</h2>
           <h2 className="admin-stats">Total Requests: {this.state.allRequests}</h2>
         </div>
         {requests}
        </div>

      </div>
    )
  }
});

  module.exports = {
    AdminPageComponent: AdminPageComponent
  }
