var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var SearchFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
        return(
        <div className="container main-search-form-container">
          <form className="main-search-form">
            <fieldset className="form-group">
              <label className="form-label" htmlFor="park-form-name">find a city park near you:</label>
              <input type="text" className="form-control" id="park-form-name" />
            </fieldset>
            <button type="submit" id="park-form-submit-btn" className="btn btn-primary pull-right">search</button>
          </form>
        </div>
        )
      }
    });

module.exports = {
  SearchFormComponent: SearchFormComponent
}
