var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var ReactCSSTransitionGroup = require('../../../../node_modules/react-addons-css-transition-group');

var AddCheckboxComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
      addedAmenities: this.props.addedAmenities
    }
  },
  render: function(){
    return (
      <div className="checkbox col-md-6">
        <label className="add-park-form-checkbox-labels">
          <input type="checkbox" onChange={this.props.handleCheck} value={this.props.amenity.id}/> {this.props.amenity.get("Title")}
        </label>
      </div>
        )
      }
    });

module.exports = {
  AddCheckboxComponent: AddCheckboxComponent
}
