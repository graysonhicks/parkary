var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var MainInfoComponent = require('./maininfo.jsx').MainInfoComponent;
var AmenitiesInfoComponent = require('./amenitiesinfo.jsx').AmenitiesInfoComponent;
var ParkCardInfoComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    // This component just passed through to MainInfo and Amenities
        return (
                  <div>
                    <div>
                      <MainInfoComponent
                        toggleFavorite={this.props.toggleFavorite}
                        favorite={this.props.favorite}
                        park={this.props.park}
                        page={this.props.page}
                      />
                    </div>
                    <div>
                      <AmenitiesInfoComponent park={this.props.park}/>
                    </div>
                  </div>
               )
              }
            });

module.exports = {
  ParkCardInfoComponent: ParkCardInfoComponent
}
