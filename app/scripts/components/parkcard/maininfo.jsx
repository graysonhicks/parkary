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

var SocialIconsComponent = require('./socialicons.jsx').SocialIconsComponent;

var MainInfoComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  handleEdit: function(){
    Backbone.history.navigate("#edit/" + this.props.park.id, {trigger: true});
  },
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
    var adminEditBtn;
    if(this.props.admin){

      adminEditBtn = (<button onClick={this.handleEdit} className="btn btn-default admin-edit-btn">Edit Park <span className="glyphicon glyphicon-wrench" aria-hidden="true"></span></button>)
    }
    // receive park from parkcard and parkcardinfo component and set fields
    var park = this.props.park;

    return (
      <div>
        <div className="col-xs-6 col-md-6 park-card-name-and-location-container">
          <div className="park-card-name">{park.get("name")}</div>
          <a href={"https://maps.google.com/maps?q=" + park.get("address")} className="park-card-location">{park.get("address")}</a>
          {adminEditBtn}
          <SocialIconsComponent
            park={this.props.park}
            toggleFavorite={this.props.toggleFavorite}
            favorite={this.props.favorite}
            page={this.props.page}
          />
        </div>
        <div className="col-xs-6 col-md-6 park-card-rating-and-social-container">
          <div className="park-card-rating">
            <Rater interactive={false} className="park-card-stars" total={5} rating={park.get("rating")} />
          </div>
          <div className="park-rating-number"><span>({park.get("rating")} on {park.get("reviews").length} reviews)</span></div>

        </div>


      <div className="park-card-description col-md-12">
        <div>{park.get("description")}</div>
      </div>
      </div>
    )
              }
            });

module.exports = {
  MainInfoComponent: MainInfoComponent
}
