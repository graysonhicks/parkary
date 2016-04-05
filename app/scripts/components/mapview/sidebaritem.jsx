var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var SidebarItemComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    var park = this.props.park;
    return (
          <div className="row">
            <div className="col-md-8">
              <img className="mapped-park-image" src="images/park2.jpg"></img>
              <span className="mapped-park-name">{park.get("name")}</span>
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
