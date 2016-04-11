var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var SidebarItemComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    if(!this.props.park){
      return(<h1>Loading</h1>)
    }
    var park = this.props.park;
    var images = park.get("images");
    var mainImage = images[0];
    var active = "";
    if(park === this.props.activeMarker){
      active = "active";
    };
    return (
          <div className={"row park-sidebar-list-item " + active}>
            <div className="col-md-9">
              <span className="mapped-park-number">{this.props.counter}.</span>
              <img className="mapped-park-image" src={mainImage.url()}></img>
              <span className="mapped-park-name"><a href={"#park/" + park.id}>{park.get("name")}</a></span>
            </div>
            <div className="col-md-3 mapped-park-rating-container">
              <span className="mapped-park-rating pull-right">
                <span className="glyphicon glyphicon-star park-stars park-card-stars mapped-park-stars" aria-hidden="true"></span>
                <span className="glyphicon glyphicon-star park-stars park-card-stars mapped-park-stars" aria-hidden="true"></span>
                <span className="glyphicon glyphicon-star park-stars park-card-stars mapped-park-stars" aria-hidden="true"></span>
               </span>
            </div>
          </div>
           )
            }
          });

module.exports = {
  SidebarItemComponent: SidebarItemComponent
}
