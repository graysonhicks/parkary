var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');


var GoogleSearchComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  handleSubmit: function(e){
    e.preventDefault();
    this.props.mapUrl();
  },
  componentDidMount: function(){
    var searchInput = new google.maps.places.Autocomplete(
    (document.getElementById('park-form-name')), {
        types: ['geocode']
    });
    google.maps.event.addListener(searchInput, 'place_changed', function (){
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
    var activeForm;
    var pendingIcon;
    if(this.props.location){
      activeForm = "";
    } else {
      activeForm = "disabled";
    }
    if(this.props.pending){
      pendingIcon = (<i className="fa fa-spinner search-form-spinner" aria-hidden="true"></i>)
      console.log(pendingIcon);
    }
    return(
      <form className="main-search-form" onSubmit={this.handleSubmit}>
        <fieldset className="form-group">
          <label className="form-label" id="main-search-label" htmlFor="park-form-name"><img id="treelogo" src="images/treelogo.png" /><span id="search-label-logo-container"><span id="parkbold">park</span><span id="parklight">ary</span></span></label>
          <input type="text" required className="form-control" id="park-form-name" placeholder="find a city park near you" />    
        </fieldset>
        <button type="submit" id="park-form-submit-btn" className={"btn btn-primary pull-right " + activeForm}>search {pendingIcon}</button>
      </form>
      )
        }
      });

  module.exports = {
    GoogleSearchComponent: GoogleSearchComponent
  }
