var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');


var ProfileComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
        return (
        <div className="container-fluid profile-container">
          <div className="panel panel-default profile-card center-block">
            <i className="pull-right fa fa-times"></i>
            <div className="panel-body">
               <div className="container-fluid">
                 <div className="row">
                  <div className="col-md-6 image-column">
                    <img className="profile-card--image img-responsive center-block" src="images/fbook.jpg" alt="" />
                  </div>
                  <div className="col-md-6 info-column">
                      <div className="col-md-6 park-card-name-and-location-container">
                        <div className="park-card-name">Tom Myers</div>
                        <div className="park-card-location">Travelers Rest, SC</div>
                      </div>
                      <div className="col-md-6 profile-social-container">
                        <div className="park-card-social-icons">
                          <i className="fa fa-envelope social-icons"></i>
                          <i className="fa fa-twitter-square social-icons"></i>
                          <i className="fa fa-facebook-official social-icons"></i>
                        </div>
                      </div>
                    </div>
                    <div className="park-card-description">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                  </div>
                 </div>
               <div className="container-fluid">
                 <div className="row">
                   <div className="col-md-6 reviews-column">
                     <span className="reviews-heading">My Reviews (9)</span>
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
                              <a className="pull-right">
                                Full review...
                              </a>
                           </div>
                         </div>
                       </div>
                       <div className="row">
                         <div className="col-md-12">
                           <p className="review-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                         </div>
                       </div>
                     </div>
                   <div className="review">
                     <div className="row">
                       <div className="col-md-2">
                         <img src="images/fbook.jpg"></img>
                       </div>
                       <div className="col-md-10">
                         <div className="row">
                           <span className="reviewer-name">Tom Myers</span>
                           <span className="review-date">June 2, 2016</span>
                         </div>
                         <div className="row">
                           <span>
                             <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                             <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                             <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                            </span>
                            <a className="pull-right">
                              Full review...
                            </a>
                         </div>
                       </div>
                     </div>
                     <div className="row">
                       <div className="col-md-12">
                         <p className="review-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                       </div>
                     </div>
                   </div>
                   <a className="all-reviews-link pull-right">See all reviews...</a>
                   </div>
                   <div className="col-md-6 profile-favorites-column">
                    <span className="reviews-heading">Favorites (5)</span>
                    <div className="review">
                      <div className="row">
                        <div className="col-md-2">
                          <img src="images/park2.jpg"></img>
                        </div>
                        <div className="col-md-10">
                          <div className="row">
                            <span className="favorite-name">McPherson Park</span>
                          </div>
                          <div className="row">
                            <span className="pull-right">
                              <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                              <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                              <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                             </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="review">
                    <div className="row">
                      <div className="col-md-2">
                        <img src="images/park2.jpg"></img>
                      </div>
                      <div className="col-md-10">
                        <div className="row">
                          <span className="favorite-name">Falls Park</span>
                        </div>
                        <div className="row">
                          <span className="pull-right">
                            <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                            <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                            <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                           </span>
                        </div>
                      </div>
                    </div>
                    </div>
                    <a className="all-reviews-link pull-right">See all favorites...</a>
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
  ProfileComponent: ProfileComponent
}
