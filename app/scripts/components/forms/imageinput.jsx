var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var ImageInputComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  handleChange: function(e){
    e.preventDefault();
    var file = e.target.files[0];
    this.props.handleFile(file);
  },
  handleRemove: function(e){
    e.preventDefault();
    console.log(this.props.count);
    this.props.removeImage(this.props.count - 1)
  },
  render: function(){
    console.log(this.props);
    return (
      <div>
        <input ref={"image" + this.props.count} onChange={this.handleChange} type="file" className="form-control" id="add-park-image" />
        <i className="glyphicon glyphicon-minus-sign add-image-url-btn" onClick={this.handleRemove}     aria-hidden="true"></i>
      </div>
        )
      }
    });

module.exports = {
  ImageInputComponent: ImageInputComponent
}
