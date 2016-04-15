var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var ReactCSSTransitionGroup = require('../../../../node_modules/react-addons-css-transition-group');
var googleReact = require('react-google-maps');
var ScriptjsLoader = require("react-google-maps/lib/async/ScriptjsLoader");
var GoogleMap = googleReact.GoogleMap;
var GoogleMapLoader = googleReact.GoogleMapLoader;
var SearchBox = googleReact.SearchBox;

var GoogleSearchComponent = require('./googlesearch.jsx').GoogleSearchComponent;

var SearchFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
        return(
    <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      <div className="panel panel-default search-form-panel center-block">
        <div className="container main-search-form-container">
          <GoogleSearchComponent
            search={this.props.search}
            mapUrl={this.props.mapUrl}
            pending={this.props.pending}
            mapCenter={this.props.mapCenter}
          />
        </div>
      </div>
    </ReactCSSTransitionGroup>
        )
      }
    });

module.exports = {
  SearchFormComponent: SearchFormComponent
}
