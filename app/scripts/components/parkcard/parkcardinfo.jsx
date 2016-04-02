var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var MainInfoComponent = require('./maininfo.jsx').MainInfoComponent;
var AmenitiesInfoComponent = require('./amenitiesinfo.jsx').AmenitiesInfoComponent;
var ParkCardInfoComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
        return (
                  <div>
                    <MainInfoComponent />
                    <div>
                    <AmenitiesInfoComponent />
                    </div>
                  </div>
               )
              }
            });

module.exports = {
  ParkCardInfoComponent: ParkCardInfoComponent
}
