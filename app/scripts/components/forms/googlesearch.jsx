var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');


var GoogleSearchComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  handleSubmit: function(){
    this.props.parseLocationQuery();
    Backbone.history.navigate("map", {trigger: true})
  },
  render: function(){
        return(
      <form className="main-search-form" onSubmit={this.handleSubmit}>
        <fieldset className="form-group">
          <label className="form-label" id="main-search-label" htmlFor="park-form-name"><img id="treelogo" src="images/treelogo.png" /><span id="search-label-logo-container"><span id="parkbold">park</span><span id="parklight">ary</span></span></label>
          <input type="text" className="form-control" id="park-form-name" placeholder="find a city park near you" />
        </fieldset>
        <button type="submit" id="park-form-submit-btn" className="btn btn-primary pull-right">search</button>
      </form>
      )
        }
      });

  module.exports = {
    GoogleSearchComponent: GoogleSearchComponent
  }
