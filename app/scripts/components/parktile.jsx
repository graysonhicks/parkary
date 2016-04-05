var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var ParkTileComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  handleClick: function(e){
    e.preventDefault();
    Backbone.history.navigate("park", {trigger: true});
  },
  render: function(){
    var park = this.props.park;
    var images = park.get("images");

        return (
            <div className="col-sm-6 col-md-3 thumbnail-columns">
              <div onClick={this.handleClick} className="thumbnail">
                <img className="thumbnail-images" src="images/park.jpg" alt="" />
                <div className="caption">
                  <span className="park-name">{park.get("name")}</span>
                  <span className="pull-right park-rating">
                    <span className="glyphicon glyphicon-star park-stars" aria-hidden="true"></span>
                    <span className="glyphicon glyphicon-star park-stars" aria-hidden="true"></span>
                    <span className="glyphicon glyphicon-star park-stars" aria-hidden="true"></span>
                    <span className="glyphicon glyphicon-star park-stars" aria-hidden="true"></span>
                  </span>
                  <p className="park-description">{park.get("description")}</p>
                </div>
              </div>
            </div>
         )
        }
      });

module.exports = {
  ParkTileComponent: ParkTileComponent
}
