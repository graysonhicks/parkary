var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var bootstrap = require('bootstrap-sass/assets/javascripts/bootstrap.js');
var Carousel = require('react-bootstrap').Carousel;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Button = require('react-bootstrap').Button;

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

    var newImage = function(image, index){
      return (
          <Carousel.Item key={index}>
            <img className="carousel-images" src={image.url()}/>
          </Carousel.Item>
      )
    }
    // map over images array and add as new carousel item
    return (
      <div>
        <Carousel
          className="image-carousel"
          prevIcon={<Glyphicon glyph="arrow-left" />}
          nextIcon={<Glyphicon glyph="arrow-right" />}
          activeIndex={this.state.index}
          direction={this.state.direction}
          onSelect={this.handleSelect}>
            {this.state.images.map(newImage.bind(this))}
        </Carousel>
        <Carousel.Caption className="full-screen-carousel-btn-container">
          <Button onClick={this.props.toggleFull} className="full-screen-carousel-btn"> <Glyphicon glyph="resize-full" /> </Button>
        </Carousel.Caption>
      </div>
    );
  }
});
module.exports = {
  ParkImageCarouselComponent: ParkImageCarouselComponent
}
