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
    // on submit, set the lat and lng in the url bar
    this.props.mapUrl();
  },
  componentDidMount: function(){
    // set input as google places input
    var searchInput = new google.maps.places.Autocomplete(
    (document.getElementById('park-form-name')), {
        types: ['geocode']
    });
    //when place is changed, get location from google api
    google.maps.event.addListener(searchInput, 'place_changed', function (){
          var place = searchInput.getPlace();
          var lat = place.geometry.location.lat();
          var lng = place.geometry.location.lng();
          var placeName = place.formatted_address;
          var name = place.name;
          // build an object to pass back up and set in interface state
          var locationObj = {
            "name": name,
            "lat": lat,
            "lng": lng,
            "placeName": placeName
          };
          //function to set in state
          this.props.search(locationObj, "searchBar");
        }.bind(this))
  },
  render: function(){
    var activeForm;
    var searchButton;
    //disables search button while query is searching
    if(this.props.mapCenter){
      activeForm = "";
    } else {
      activeForm = "disabled";
    }
    // Spinner bucket while query is fetching
    if(this.props.pending){
      searchButton = (<button type="submit" id="park-form-submit-btn" className={"btn btn-primary pull-right " + activeForm}>searching! <i className="fa fa-spinner fa-spin search-form-spinner" aria-hidden="true"></i></button>)
    } else {
      searchButton = (<button type="submit" id="park-form-submit-btn" className={"btn btn-primary pull-right " + activeForm}>search</button>)
    }
    return(
      <form className="main-search-form" onSubmit={this.handleSubmit}>
        <fieldset className="form-group">
          <label className="form-label" id="main-search-label" htmlFor="park-form-name"><img id="treelogo" src="images/treelogo.png" /><span id="search-label-logo-container"><span id="parkbold">park</span><span id="parklight">ary</span></span></label>
          <input type="text" required className="form-control" id="park-form-name" placeholder="find a city park near you" />
        </fieldset>
        {searchButton}
      </form>
      )
        }
      });

  module.exports = {
    GoogleSearchComponent: GoogleSearchComponent
  }
