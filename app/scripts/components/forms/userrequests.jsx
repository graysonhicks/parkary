var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');
var ParseReact = require('parse-react');

var UserRequestsComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  componentWillMount: function(){
    var self = this;
  	var Requests = Parse.Object.extend("Requests");
		var query = new Parse.Query( Requests );
		query.find().then(function(requests){
      requests.map(function(request){

      })
			self.setState({"allRequests": requests});
		}, function(error){
			console.log(error);
		});
  },
  render: function(){
    if(!this.state.allRequests){
      return (
        <h1>Loading</h1>
      )
    }
    var query = new Parse.Query("User");

    var newRequest = function(request, index){

      return(
        <div className="admin-request col-md-12" key={index}>
          <div className="col-md-12">
            <h4>
              <a className="user-request-name-link" href={"#profile/" + request.get("userId").id}>{request.get("userId").get("username")}</a>
            </h4>
          </div>
          <div className="col-md-6">
            <h5>{request.get("name")}</h5>
          </div>
          <div className="col-md-6">
            <h5>{request.get("location")}</h5>
          </div>
          <div className="col-md-12">
            <p>
              {request.get("comments")}
            </p>
          </div>
        </div>
      )
    }
    return(
      <div className="col-md-5 col-md-offset-1 user-requests-column">
        {this.state.allRequests.map(newRequest.bind(this))}
      </div>
    )


  }
});

  module.exports = {
    UserRequestsComponent: UserRequestsComponent
  }
