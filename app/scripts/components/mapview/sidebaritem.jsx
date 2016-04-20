var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Rater = require('react-rater').default;

var SidebarItemComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    // Return early
    if(!this.props.park){
      return(
      <div>
        <h4>Loading...</h4>
        <i className="fa fa-spinner fa-spin fa-2x map-loading-spinner" aria-hidden="true"></i>
      </div>)
    }

    var thumbnail;
    // park being mapped
    var park = this.props.park;
    // get array of images from parse
    var images = park.get("images");

    if(images.length < 1){
      thumbnail = ("images/noimagenotice.png");
    } else {
        // set main image as the first image in array, this will be thumbnail
      thumbnail = images[0].url()
    }

    // if the mapped park is the same as park that has been marked as active by marker click, then set as active for className
    var active = "";
    if(park === this.props.activeMarker){
      active = "active";
     $('.sidebar-column').animate({
            scrollTop: $(this.el).offset().top + 'px'
        }, 'fast');
    };
    // grab active marker and scroll to top of offset

    // set icon based on counter to match
    var icon = {
      url: "images/mapmarkers/mapmarker" + this.props.counter + ".png"
    }
    return (
          <div className={"row park-sidebar-list-item " + active}>
            <div className="col-md-9 park-sidebar-list-item-col">
              <span className="mapped-park-number"><img src={icon.url} /></span>
              <img className="mapped-park-image" src={thumbnail}></img>
              <span className="mapped-park-name"><a href={"#park/" + park.id}>{park.get("name")}</a></span>
            </div>
            <div className="col-md-3 mapped-park-rating-container">
              <span className="mapped-park-rating pull-right">
                <Rater className="mapped-park-stars" interactive={false} total={5} rating={park.get("rating")}/>
                <span className="mapped-park-rating-number pull-right">({park.get("rating")})</span>
               </span>
            </div>
          </div>
           )
            }
          });

module.exports = {
  SidebarItemComponent: SidebarItemComponent
}
