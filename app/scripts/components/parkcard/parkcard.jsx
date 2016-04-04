var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');


var LocationComponent = require('./staticmap.jsx').LocationComponent;
var ParkImageCarouselComponent = require('./parkimagecarousel.jsx').ParkImageCarouselComponent;
var ParkCardInfoComponent = require('./parkcardinfo.jsx').ParkCardInfoComponent;
var ReviewsComponent = require('./reviews.jsx').ReviewsComponent;

var ParkCardComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
        return (
        <div className="container-fluid park-card-container">
          <div className="panel panel-default park-card center-block">
            <i className="pull-right fa fa-times"></i>
            <div className="panel-body">
             <div className="container-fluid">
               <div className="row">
                  <div className="col-md-6 image-column">
                    <ParkImageCarouselComponent />
                  </div>
                  <div className="col-md-6 info-column">
                    <ParkCardInfoComponent />
                  </div>
                </div>
               </div>
               <div className="container-fluid">
                 <div className="row">
                   <ReviewsComponent />
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
