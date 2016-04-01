var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var ReactCSSTransitionGroup = require('../../../node_modules/react-addons-css-transition-group');

var SearchFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  handleSubmit: function(){
    Backbone.history.navigate("parks", {trigger: true})
  },
  render: function(){
        return(
    <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      <div className="panel panel-default search-form-panel center-block">
        <div className="container main-search-form-container">
          <form className="main-search-form" onSubmit={this.handleSubmit}>
            <fieldset className="form-group">
              <label className="form-label" id="main-search-label" htmlFor="park-form-name"><img id="treelogo" src="images/treelogo.png" /><span id="search-label-logo-container"><span id="parkbold">park</span><span id="parklight">ary</span></span></label>
              <input type="text" className="form-control" id="park-form-name" placeholder="find a city park near you" />
            </fieldset>
            <button type="submit" id="park-form-submit-btn" className="btn btn-primary pull-right">search</button>
          </form>
        </div>
      </div>
    </ReactCSSTransitionGroup>
        )
      }
    });

module.exports = {
  SearchFormComponent: SearchFormComponent
}
