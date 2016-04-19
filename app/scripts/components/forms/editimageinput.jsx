var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var EditImageInputComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  handleChange: function(e){
    e.preventDefault();
    // grabs file from input
    var file = e.target.files[0];
    // passes up to be set as parse file, named and pushed to images array
    this.props.handleFile(file);
  },
  handleRemove: function(e){
    e.preventDefault();
    // this calls a splice based on the count which tracks current array index so clicked file can be removed
    this.props.removeImage(this.props.count - 1)
  },
  render: function(){
    if(this.props.count === this.props.length){
      return(
      <div className="col-md-4">
        <img src="http://placehold.it/50/50" />
        <input ref={"image" + this.props.count} onChange={this.handleChange} type="file" className="form-control" id="add-park-image" />
        <i className="glyphicon glyphicon-minus-sign add-image-url-btn" onClick={this.handleRemove}     aria-hidden="true"></i>
      </div>)
    }
    return (
      <div className="col-md-4">
        <img className="add-edit-thumbnails" src={this.props.image.url()} />
        <input ref={"image" + this.props.count} onChange={this.handleChange} type="file" className="form-control" id="add-park-image" />
        <i className="glyphicon glyphicon-minus-sign add-image-url-btn" onClick={this.handleRemove} aria-hidden="true"></i>
      </div>
        )
      }
    });

module.exports = {
  EditImageInputComponent: EditImageInputComponent
}
