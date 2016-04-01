var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var ParkCardComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
        return (
          <div className="panel panel-default park-card center-block">
            <div className="panel-body">
               <div className="container-fluid">
                 <div className="row">
                  <div className="col-md-6">
                    <img className="park-card-images img-responsive center-block" src="images/park.jpg" alt="" />
                  </div>
                  <div className="col-md-6">
                    <div className="park-card-name-and-rating-container">
                      <span className="park-card-name">McPherson Park</span>
                      <span className="pull-right park-card-rating">
                        <span className="glyphicon glyphicon-star park-stars" aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-star park-stars" aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-star park-stars" aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-star park-stars" aria-hidden="true"></span>
                      </span>
                    </div>
                    <div className="park-card-location-and-social-container">
                      <span className="park-card-location">Greenville, SC</span>
                      <span className="pull-right park-card-rating">
                        <i className="fa fa-envelope"></i>
                        <i className="fa fa-twitter-square"></i>
                        <i className="fa fa-facebook-official"></i>
                        <i className="fa fa-heart-o"></i>
                      </span>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                 </div>
               </div>
               <div className="container-fluid">
                 <div className="row">
                   <div className="col-md-6">
                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                   </div>
                   <div className="col-md-6">
                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
               )
              }
            });

module.exports = {
  ParkCardComponent: ParkCardComponent
}
