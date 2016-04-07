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
  handleCheck: function(amenity, checked){
    var addedAmenities = this.state.addedAmenities;

    if(checked){
      addedAmenities.push(amenity);
    } else {
      for(var i = 0; i < addedAmenities.length; i++) {
            if (addedAmenities[i] == amenity) {
              addedAmenities.splice(i, 1);
            }
        }
  }
  },
  handleSubmit: function(e){
    e.preventDefault();
    var Park = Parse.Object.extend("Parks"); //move to model file
    var park = new Park();
    var gp = new Parse.GeoPoint({
                latitude: parseFloat(this.state.lat),
                longitude: parseFloat(this.state.lng)
            });
    console.log(gp);
    var newParkData = _.omit(this.state, ["allAmenities", "images", "addedAmenities", "lat", "lng"]);
    var relation = park.relation("amenities");

    this.state.addedAmenities.forEach(function(amenity){
      relation.add(amenity);
    });

    park.set(newParkData);
    park.set("location", gp);
    park.save(null, {
      success:function(newPark) {
        console.log(newPark);
      },
      error:function(obj, error) {
        console.log(error);
      }
    });
  },
  render: function(){
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
      <h2 className="add-park-form-heading text-center">Add a Park</h2>
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
