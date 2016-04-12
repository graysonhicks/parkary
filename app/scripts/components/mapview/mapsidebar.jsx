var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var SidebarItemComponent = require('./sidebaritem.jsx').SidebarItemComponent;

var MapSidebarComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
      // Return early
    if(!this.props.location){
      return(
      <div>
        <h2>Loading...</h2>
        <i className="fa fa-spinner fa-spin fa-5x map-loading-spinner" aria-hidden="true"></i>
      </div>)
    }
    // map over all parks from the query and build a list item for each
    // passing in active marker so they can respond / highlight to marker clicks
    var counter = 0;
      var sidebarItem = function(park){
        counter++;
        return(
        <div key={park.id}>
          <SidebarItemComponent activeMarker={this.props.activeMarker} counter={counter} park={park} />
        </div>
      )}

    return (
    <div>
      <span>{this.props.location.name} Parks</span>
      <div className="mapped-parks">
        <div className="mapped-park">
          {this.props.parks.map(sidebarItem.bind(this))}
          </div>
        </div>
      </div>
           )
            }
          });

module.exports = {
  MapSidebarComponent: MapSidebarComponent
}
