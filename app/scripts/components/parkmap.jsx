var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Switch = require('react-bootstrap-switch');
var ReactCSSTransitionGroup = require('../../../node_modules/react-addons-css-transition-group');

var DynamicMapComponent = require('./dynamicmap.jsx').DynamicMapComponent;

var ParkMapComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
        return (
        <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <div className="container map-container">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="col-md-9 map-column">
                    <DynamicMapComponent location={this.props.location} />
                </div>
                <div className="col-md-3">
                  <span>Greenville, SC Parks</span>
                  <div className="mapped-parks">
                    <div className="mapped-park">
                      <div className="row">
                        <div className="col-md-8">
                          <img className="mapped-park-image" src="images/park2.jpg"></img>
                          <span className="mapped-park-name">McPherson Park</span>
                        </div>
                        <div className="col-md-4 mapped-park-rating-container">
                          <span className="mapped-park-rating">
                            <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                            <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                            <span className="glyphicon glyphicon-star park-stars park-card-stars" aria-hidden="true"></span>
                           </span>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </ReactCSSTransitionGroup>
         )
        }
      });

module.exports = {
  ParkMapComponent: ParkMapComponent
}
