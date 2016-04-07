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
    return (
          <div className="row park-sidebar-list-item">
            <div className="col-md-8">
              <img className="mapped-park-image" src={mainImage.url()}></img>
              <span className="mapped-park-name"><a href={"#park/" + park.id}>{park.get("name")}</a></span>
            </div>
            <div className="col-md-4 mapped-park-rating-container">
              <span className="mapped-park-rating">
                <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
               </span>
            </div>
          </div>
           )
            }
          });

module.exports = {
  SidebarItemComponent: SidebarItemComponent
}
