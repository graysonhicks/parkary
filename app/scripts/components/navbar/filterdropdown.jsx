var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');

var FilterCheckboxComponent = require('./filtercheckbox.jsx').FilterCheckboxComponent;

var FilterDropdownComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
        allAmenities: [],
        addedAmenities: []
    }
  },
  componentWillMount: function(){
      var self = this;
  		var Amenities = Parse.Object.extend("Amenities");
  		var query = new Parse.Query( Amenities );
      // query all possible amenities and set in state for mapping and rendering
  		query.find().then(function(amenities){
  			self.setState({"allAmenities": amenities});
  		}, function(error){
  			console.log(error);
  		});
  },
  handleCheck: function(amenity, checked){
    var addedAmenities = this.state.addedAmenities;

    // on check, add amenity to new array
    if(checked){
      // push amenity
      addedAmenities.push(amenity);
      this.props.filterAmenity(addedAmenities);
    } else {
      //other wise find amenity and remove if unchecked
      for(var i = 0; i < addedAmenities.length; i++) {
            if (addedAmenities[i] == amenity) {
              addedAmenities.splice(i, 1);
              this.props.filterAmenity(addedAmenities);
            }
        }
    }

  },
  render: function(){

    if(!this.state.allAmenities){
      return(<h1>Loading</h1>)
    }
      var newAmenity = function(amenity){
        return (
          <div key={amenity.objectId}>
            <FilterCheckboxComponent handleCheck={this.handleCheck} addedAmenities={this.state.addedAmenities} amenity={amenity}/>
          </div>
        )
      }
    return (
      <li className="dropdown">
        <a href="#" className="search-link" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">filter by <span className="caret"></span>
        </a>
          <ul id="filter-dropdown" className="dropdown-menu">
            <form className="filter-form col-md-12">
              {this.state.allAmenities.map(newAmenity.bind(this))}
            </form>
          </ul>
      </li>
          )
        }
      });

module.exports = {
  FilterDropdownComponent: FilterDropdownComponent
}
