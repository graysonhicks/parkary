var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');

var LoadingComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){

        return (
        <div className="container-fluid park-card-container">
          <div className="panel panel-default center-block loading-panel">
            <div className="panel-body loading-panel-body">
              <h2>Loading...</h2>
              <i className="fa fa-spinner fa-spin fa-5x loading-panel-spinner" aria-hidden="true"></i>
            </div>
          </div>
        </div>
         )
        }
      });

module.exports = {
  LoadingComponent: LoadingComponent
}
