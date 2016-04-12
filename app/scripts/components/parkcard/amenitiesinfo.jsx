var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');
var ParseReact = require('parse-react');

Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var AmenityItemComponent = require('./amenityitem.jsx').AmenityItemComponent;

var AmenitiesInfoComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
	componentWillMount: function() {
    // query amenities relation based on park passed in from parkcard and parkcardinfo component
		var self = this;
		var relation = this.props.park.relation("amenities");
    var query = relation.query().find().then(function(obj){
      // set amenities in state
      self.setState({"amenities": obj})
    });

	},
  render: function(){
    // Return early if amenities not set yet
    if(!this.state.amenities){
      return (
      <div>
        <h4>Loading...</h4>
        <i className="fa fa-spinner fa-spin fa-2x amenities-loading-spinner" aria-hidden="true"></i>
      </div>
      )
    }

    var newAmenity = function(amenity){
      return (
        <AmenityItemComponent key={amenity.objectId} amenity={amenity}/>
      )
    }
    // map over amenities array
      return (
        <div className="col-md-12 amenities-columns">
          <ul className="list-group amenities-lists">
            {this.state.amenities.map(newAmenity.bind(this))}
          </ul>
        </div>
             )
          }
      });

module.exports = {
  AmenitiesInfoComponent: AmenitiesInfoComponent
}
