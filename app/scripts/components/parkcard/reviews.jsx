var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var ReviewsComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
        return (
           <div className="col-md-6 reviews-column">
             <span className="reviews-heading">Reviews (9)</span>
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
             <a className="all-reviews-link pull-right">See all reviews...</a>
           </div>
               )
              }
            });

module.exports = {
  ReviewsComponent: ReviewsComponent
}
