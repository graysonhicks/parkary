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

Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var AddCheckboxComponent = require('./parkcheckbox.jsx').AddCheckboxComponent;

var AddChangeComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
        name: "",
        lat: 0,
        lng: 0,
        address: "",
        size: 0,
        dateFounded: "",
        description: "",
        allAmenities: [],
        addedAmenities: [],
        images: []
    }
  },
	componentWillMount: function() {
		var self = this;
		var Amenities = Parse.Object.extend("Amenities");
		var query = new Parse.Query( Amenities );
		query.find().then(function(amenities){
			self.setState({"allAmenities": amenities});
		}, function(error){
			console.log(error);
		});
	},
  handleCheck: function(e){
		var self = this;
		var Amenities = Parse.Object.extend("Amenities");
		var query = new Parse.Query( Amenities );
    var addedAmenities = this.state.addedAmenities;
    var objectId = e.target.value;
    if(e.target.checked){
      query.get(objectId, {
        success: function(object) {
          addedAmenities.push(object);
        },
        error: function(object, error) {
          console.log(error);
        }
      });
    } else {
      query.get(objectId, {
        success: function(object) {
          for(var i = 0; i < addedAmenities.length; i++) {
              if (addedAmenities[i].id == objectId) {
                addedAmenities.splice(i, 1);
              }
          }
        },
        error: function(object, error) {
          console.log(error);
        }
      });
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    var newParkData = _.omit(this.state, ["allAmenities", "images", "addedAmenities"]);
    var Park = Parse.Object.extend("Parks");
    var park = new Park();
    this.state.addedAmenities.map(function(amenity){
      var relation = park.relation("Amenities");
      relation.add(amenity);
    });
  },
  render: function(){
    console.log(this.state);
      var newAmenity = function(amenity){
        return (
          <div key={amenity.objectId}>
            <AddCheckboxComponent addedAmenities={this.state.addedAmenities} handleCheck={this.handleCheck} amenity={amenity}/>
          </div>
        )
      }
    return (
  <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
    <div className="container add-park-form-container col-md-12">
      <form id="add-park-form" onSubmit={this.handleSubmit}>
        <div className="col-md-4">
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-name">park name</label>
            <input valueLink={this.linkState('name')} type="text" className="form-control" id="add-park-name" />
          </fieldset>
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-lat">latitude</label>
            <input valueLink={this.linkState('lat')} type="text" className="form-control" id="add-park-lat" />
          </fieldset>
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-lng">longitude</label>
            <input valueLink={this.linkState('lng')} type="text" className="form-control" id="add-park-lng" />
          </fieldset>
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-address">address</label>
            <input valueLink={this.linkState('address')} type="text" className="form-control" id="add-park-address" />
          </fieldset>
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-size">size</label>
            <input valueLink={this.linkState('size')} type="text" className="form-control" id="add-park-size" />
          </fieldset>
        </div>
        <div className="col-md-4">
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-date">date founded</label>
            <input valueLink={this.linkState('dateFounded')} type="text" className="form-control" id="add-park-date" />
          </fieldset>
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-description">description</label>
            <textarea valueLink={this.linkState('description')} rows="5" placeholder="limit to 200 characters" className="form-control" id="add-park-description" />
          </fieldset>
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-image">image url</label>
            <input valueLink={this.linkState('image')} rows="5" className="form-control" id="add-park-image" />
            <span className="glyphicon glyphicon-plus-sign add-image-url-btn pull-right" aria-hidden="true"></span>
          </fieldset>
        </div>
        <div className="col-md-4">
          <fieldset className="form-group add-park-form">
            <div className="col-md-12 add-park-form-amenities-checkboxes-container">
              {this.state.allAmenities.map(newAmenity.bind(this))}
            </div>
          </fieldset>
        </div>
      </form>
      <button type="submit" form="add-park-form" id="add-park-form-submit-btn" className="btn btn-primary pull-right">add park</button>
    </div>
  </ReactCSSTransitionGroup>
    )
  }
});

module.exports = {
  AddChangeComponent: AddChangeComponent
}
