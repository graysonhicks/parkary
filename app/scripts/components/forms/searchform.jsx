var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var ReactCSSTransitionGroup = require('../../../../node_modules/react-addons-css-transition-group');
var googleReact = require('react-google-maps');
var ScriptjsLoader = require("react-google-maps/lib/async/ScriptjsLoader");
var GoogleMap = googleReact.GoogleMap;
var GoogleMapLoader = googleReact.GoogleMapLoader;
var SearchBox = googleReact.SearchBox;

var GoogleSearchComponent = require('./googlesearch.jsx').GoogleSearchComponent;

var SearchFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  componentDidMount: function(){
    var searchInput = new google.maps.places.Autocomplete(
    (document.getElementById('park-form-name')), {
        types: ['geocode']
    });
    google.maps.event.addListener(searchInput, 'place_changed', function () {
          var place = searchInput.getPlace();
          var lat = place.geometry.location.lat();
          var lng = place.geometry.location.lng();
          var name = place.name;
          var locationObj = {
            "name": name,
            "lat": lat,
            "lng": lng
          };
          this.props.setLocationObj(locationObj);
        }.bind(this))
  },
  render: function(){
        return(
    <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      <div className="panel panel-default search-form-panel center-block">
        <div className="container main-search-form-container">
          <GoogleSearchComponent parseLocationQuery={this.props.parseLocationQuery} />
        </div>
      </div>
    </ReactCSSTransitionGroup>
        )
      }
    });

module.exports = {
  SearchFormComponent: SearchFormComponent
}
