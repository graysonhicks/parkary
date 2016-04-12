var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var bootstrap = require('bootstrap-sass/assets/javascripts/bootstrap.js');
var Carousel = require('react-bootstrap').Carousel;

var ParkImageCarouselComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    // gets park from parkcard component and gets images array
    // index and direction are for carousel
    return {
      images: this.props.park.get("images"),
      index: 0,
      direction: null
    }
  },
  handleSelect: function(selectedIndex, selectedDirection) {
    // change image on arrow clicks
    this.setState({
      index: selectedIndex,
      direction: selectedDirection
    });
  },
  render: function(){
    // Return early if park not received yet
    if(!this.props.park){
      return (
        <div>
          <h4>Loading...</h4>
          <i className="fa fa-spinner fa-spin fa-2x carousel-loading-spinner" aria-hidden="true"></i>
        </div>
      )
    }
    var newImage = function(image){
      return (
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={image.url()}/>
          </Carousel.Item>
      )
    }
    // map over images array and add as new carousel item
    return (
      <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
          {this.state.images.map(newImage.bind(this))}
      </Carousel>
    );
  }
});
module.exports = {
  ParkImageCarouselComponent: ParkImageCarouselComponent
}
