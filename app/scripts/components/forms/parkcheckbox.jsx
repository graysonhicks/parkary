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
  handleCheck: function(e){
    var checked = e.target.checked;
    // pass checked variable in so can tell to push or splice
    this.props.handleCheck(this.props.amenity, checked);
  },
  render: function(){
    var self=this;
    var checked;
    if(this.props.editMode){
      this.props.addedAmenities.map(function(currentAmenity){
        if(self.props.amenity.id === currentAmenity.id){
          checked = "checked";
          console.log(checked);
        }
      })
    }
    return (
      <div className="checkbox col-md-6">
        <label className="add-park-form-checkbox-labels">
          <input type="checkbox" onChange={this.handleCheck} value={this.props.amenity.id} checked={checked}/> {this.props.amenity.get("Title")}
        </label>
      </div>
        )
      }
    });

module.exports = {
  AddCheckboxComponent: AddCheckboxComponent
}
