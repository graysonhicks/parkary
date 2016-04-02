var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var MainInfoComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
        return (
          <div>
            <div className="col-md-6 park-card-name-and-location-container">
              <div className="park-card-name">McPherson Park</div>
              <div className="park-card-location">Greenville, SC</div>
            </div>
            <div className="col-md-6 park-card-rating-and-social-container">
              <div className="park-card-rating">
                <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
              </div>
              <div className="park-card-social-icons">
                <i className="fa fa-envelope social-icons"></i>
                <i className="fa fa-twitter-square social-icons"></i>
                <i className="fa fa-facebook-official social-icons"></i>
                <i className="fa fa-heart social-icons"></i>
              </div>
            </div>
            <div className="park-card-description">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
               )
              }
            });

module.exports = {
  MainInfoComponent: MainInfoComponent
}
