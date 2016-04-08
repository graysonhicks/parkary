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
    var counter = 0;
      var sidebarItem = function(park){
        counter++;
        return(
        <div key={park.id}>
          <SidebarItemComponent counter={counter} park={park} />
        </div>
      )}
    if(!this.props.location){
      return(<h1>Loading</h1>)
    }
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
