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
    return {
      images: this.props.park.get("images"),
      index: 0,
      direction: null
    }
  },
  handleSelect: (selectedIndex, selectedDirection) {
    this.setState({
      index: selectedIndex,
      direction: selectedDirection
    });
  },
  render: function(){
    if(!this.props.park){
      return (
        <h1>Loading!</h1>
      )
    }
    var newImage = function(image){
      return (
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={image.url()}/>
          </Carousel.Item>
      )
    }

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
