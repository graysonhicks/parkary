var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Rater = require('react-rater').default;

var ParkTileComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    if(!this.props.park){
      return (<h1>Loading</h1>)
    }
    var park = this.props.park;
    var images = park.get("images");
    var mainImage = images[0];
        return (
            <div className="col-sm-6 col-md-3 thumbnail-columns">
              <a className="thumbnail-link" href={"#park/" + park.id}>
              <div className="thumbnail">
                <img className="thumbnail-images" src={mainImage.url()} alt="" />
                <div className="caption">
                  <span className="park-name">{park.get("name")}</span>
                  <span className="pull-right park-rating">
                    <Rater className="park-stars" interactive={false} total={5} rating={4}/>
                  </span>
                  <p className="park-description">{park.get("description")}</p>
                </div>
              </div>
            </a>
            </div>
         )
        }
      });

module.exports = {
  ParkTileComponent: ParkTileComponent
}
