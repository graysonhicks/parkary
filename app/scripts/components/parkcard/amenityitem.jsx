var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');

Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var AmenityItemComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    // render checbox icon and name for each amenity
        return (
            <li className="list-group-item col-md-3 amenities">
              <i className="fa fa-check-square checks"></i>
              {this.props.amenity.get("Title")}
            </li>
         )
            }
          });

module.exports = {
  AmenityItemComponent: AmenityItemComponent
}
