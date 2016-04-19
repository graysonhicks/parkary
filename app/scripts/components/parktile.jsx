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
    // Return early
    if(!this.props.park){
      return (<h1>Loading</h1>)
    }
    var park = this.props.park;
    var thumbnail;
    // set first image as main thumbnail
    var images = park.get("images");
    if(images.length < 1){
      thumbnail = ("images/noimagenotice.png");
    } else {
      thumbnail = images[0].url()
    }

        return (
            <div className="col-xs-6 col-sm-4 col-md-3 thumbnail-columns">
              <a className="thumbnail-link" href={"#park/" + park.id}>
              <div className="thumbnail park-thumbnails">
                <div className="thumbnail-content">
                  <img className="thumbnail-images" src={thumbnail} alt="" />
                  <div className="caption">
                    <span className="park-name">{park.get("name")}</span>
                    <span className="pull-right park-rating">
                      <Rater className="park-stars" interactive={false} total={5} rating={park.get("rating")}/>
                    </span>
                    <p className="park-description">{park.get("description")}</p>
                  </div>
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
