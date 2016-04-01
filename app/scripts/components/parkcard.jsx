var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');


var LocationComponent = require('./map.jsx').LocationComponent;

var ParkCardComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
        return (
        <div className="container-fluid park-card-container">
          <div className="panel panel-default park-card center-block">
            <div className="panel-body">
               <div className="container-fluid">
                 <div className="row">
                  <div className="col-md-6 image-column">
                    <img className="park-card-images img-responsive center-block" src="images/park.jpg" alt="" />
                  </div>
                  <div className="col-md-6 info-column">
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
                      <div>
                        <div className="col-md-3 amenities-columns">
                          <ul className="list-group amenities-lists">
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Playground
                            </li>
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Tennis Courts
                            </li>
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Picnic Shelter
                            </li>
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Dog Park
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-3 amenities-columns">
                          <ul className="list-group amenities-lists">
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Playground
                            </li>
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Tennis Courts
                            </li>
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Picnic Shelter
                            </li>
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Dog Park
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-3 amenities-columns">
                          <ul className="list-group amenities-lists">
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Playground
                            </li>
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Tennis Courts
                            </li>
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Picnic Shelter
                            </li>
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Dog Park
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-3 amenities-columns">
                          <ul className="list-group amenities-lists">
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Playground
                            </li>
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Tennis Courts
                            </li>
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Picnic Shelter
                            </li>
                            <li className="list-group-item amenities">
                              <i className="fa fa-check-square checks"></i>
                              Dog Park
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                 </div>
               <div className="container-fluid">
                 <div className="row">
                   <div className="col-md-6 reviews-column">
                     <span>Reviews (9)</span>
                     <div className="review">
                       <div className="row">
                         <div className="col-md-2">
                           <img src="images/fbook.jpg"></img>
                         </div>
                         <div className="col-md-10">
                           <div className="row">
                             <span>Tom Myers</span>
                             <span className="review-date">January 29, 2016</span>
                           </div>
                           <div className="row">
                             <span>
                               <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                               <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                               <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                              </span>
                              <span className="pull-right">
                                Full review...
                              </span>
                           </div>
                         </div>
                       </div>
                       <div className="row">
                         <div className="col-md-12">
                           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="col-md-6 map-column">
                    <LocationComponent />
                   </div>
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
