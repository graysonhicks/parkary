var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var ParkImageCarouselComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      images: this.props.park.get("images")
    }
  },
  componentWillMount: function(){

  },
  render: function(){
    var mainImage = this.state.images[0];
    if(!this.state.images){
      return (
        <h1>Loading!</h1>
      )
    }
        return (
              <img className="park-card-images img-responsive center-block" src={mainImage.url()} alt="" />
               )
              }
            });

module.exports = {
  ParkImageCarouselComponent: ParkImageCarouselComponent
}
