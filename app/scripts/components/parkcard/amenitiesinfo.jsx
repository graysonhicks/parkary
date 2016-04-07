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
		var self = this;
		var relation = this.props.park.relation("amenities");
    var query = relation.query().find().then(function(obj){
      self.setState({"amenities": obj})
    });

	},
  render: function(){
    if(!this.state.amenities){
      return (
        <h1>Loading</h1>
      )
    }
    var newAmenity = function(amenity){
      return (
        <div key={amenity.objectId}>
          <AmenityItemComponent amenity={amenity}/>
        </div>
      )
    }
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
