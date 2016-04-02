var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var AmenitiesInfoComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
        return (
          <div className="col-md-3 amenities-columns">
            <ul className="list-group amenities-lists">
              <li className="list-group-item amenities">
                <i className="fa fa-check-square checks"></i>
                Playground
              </li>
              <li className="list-group-item amenities">
                <i className="fa fa-check-square checks"></i>
                Tennis Courts
              </li>
              <li className="list-group-item amenities">
                <i className="fa fa-check-square checks"></i>
                Picnic Shelter
              </li>
              <li className="list-group-item amenities">
                <i className="fa fa-check-square checks"></i>
                Dog Park
              </li>
            </ul>
          </div>
               )
              }
            });

module.exports = {
  AmenitiesInfoComponent: AmenitiesInfoComponent
}
