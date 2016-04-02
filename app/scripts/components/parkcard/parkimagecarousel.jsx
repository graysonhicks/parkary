var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var ParkImageCarouselComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
        return (
              <img className="park-card-images img-responsive center-block" src="images/park.jpg" alt="" />
               )
              }
            });

module.exports = {
  ParkImageCarouselComponent: ParkImageCarouselComponent
}
