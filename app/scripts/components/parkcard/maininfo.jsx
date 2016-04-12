var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');
var Rater = require('react-rater').default;

Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var MainInfoComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    // console.log(this.data.park);
    // return loading early if we aren't populated yet
    if(!this.props.park){
      return (
      <div>
        <h4>Loading...</h4>
        <i className="fa fa-spinner fa-spin fa-2x main-info-loading-spinner" aria-hidden="true"></i>
      </div>
    );
    }
    // receive park from parkcard and parkcardinfo component and set fields
    var park = this.props.park;
    return (
      <div>
        <div className="col-md-6 park-card-name-and-location-container">
          <div className="park-card-name">{park.get("name")}</div>
          <div className="park-card-location">Greenville, SC</div>
        </div>
        <div className="col-md-6 park-card-rating-and-social-container">
          <div className="park-card-rating">
            <Rater interactive={false} className="park-card-stars" total={5} rating={park.get("rating")} />
          </div>
          <div className="park-rating-number"><span>({park.get("rating")})</span></div>
          <div className="park-card-social-icons">
            <i className="fa fa-envelope social-icons"></i>
            <i className="fa fa-twitter-square social-icons"></i>
            <i className="fa fa-facebook-official social-icons"></i>
            <i className="fa fa-heart social-icons"></i>
          </div>
        </div>
        <div className="park-card-description">
          <p>{park.get("description")}</p>
        </div>
      </div>
    )
              }
            });

module.exports = {
  MainInfoComponent: MainInfoComponent
}
