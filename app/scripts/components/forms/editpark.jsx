var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var ReactCSSTransitionGroup = require('../../../../node_modules/react-addons-css-transition-group');
var Parse = require('parse');
var ParseReact = require('parse-react');

Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var AddCheckboxComponent = require('./parkcheckbox.jsx').AddCheckboxComponent;
var EditImageInputComponent = require('./editimageinput.jsx').EditImageInputComponent;
var WarningModal = require('./../warningmodal.jsx').WarningModal;
var ChooseParkModal = require('./chooseparkmodal.jsx').ChooseParkModal;
var AddedEditedModal = require('./parkaddededitedmodal.jsx').AddedEditedModal;

var EditParkComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
        name: "",
        lat: 0,
        lng: 0,
        address: "",
        size: 0,
        dateFounded: "",
        description: "",
        allAmenities: [],
        originialAmenities: this.addedAmenities,
        addedAmenities: [],
        images: [],
        imageCount: 1,
        showModal: false
    }
  },
	componentWillMount: function() {
    this.setState({
      "editMode": true
    })
    // pulling all amenities down to populate checkbox options
		var self = this;
    // Query if user is an admin, otherwise show modal
    var query = (new Parse.Query(Parse.Role));
    if(!Parse.User.current()){
      self.setState({"showModal": true})
    }
    if(Parse.User.current()){
      query.equalTo("name", "Administrator");
      query.equalTo("users", Parse.User.current());
      query.first().then(function(adminRole) {
          if (adminRole) {
              console.log("user is an admin");
          } else {
              self.setState({"showModal": true})
              console.log("user is not an admin");
          }
      });
    }
		var Amenities = Parse.Object.extend("Amenities");
		var amenitiesQuery = new Parse.Query( Amenities );
    // query all possible amenities and set in state for mapping and rendering
		amenitiesQuery.find().then(function(amenities){
			self.setState({"allAmenities": amenities});
		}, function(error){
			console.log(error);
		});
    // query park based on parkId in url
	  var parkQuery = new Parse.Query("Parks");
    parkQuery.include("newAmenities");
    parkQuery.get(this.props.parkId).then(function(park){
      var self = this;
      // get location
      var location = park.get("location");
      // set state of all other park properties and set into form with linkstate here as well
      this.setState({
        "park": park,
        "name": park.get("name"),
        "lat": location.latitude,
        "lng": location.longitude,
        "address": park.get("address"),
        "size": park.get("size"),
        "dateFounded": park.get("dateFounded"),
        "description": park.get("description"),
        "images": park.get("images"),
        "imageCount": park.get("images").length,
        "newImages": [],
        "addedAmenities": park.get("newAmenities")
      });
    }.bind(this));
	},
  closeModal: function(){
    this.setState({
      showModal: false
    })
    Backbone.history.navigate("", {trigger: true});
  },
  handleReturn: function(){
    console.log('return');
    Backbone.history.navigate("", {trigger: true});
  },
  removeImage: function(index){
    var images = this.state.images;
    images.splice(index, 1);
    this.setState({"images": images});
  },
  handleCheck: function(amenity, checked){


    var addedAmenities = this.state.addedAmenities;

    // on check, add amenity to new array
    if(checked){
      // push amenity
      addedAmenities.push(amenity);

    } else {
      //other wise find amenity and remove if unchecked
      for(var i = 0; i < addedAmenities.length; i++) {
          if (addedAmenities[i].id == amenity.id) {
            addedAmenities.splice(i, 1);
    
          }
        }
    }
  },
  handleFile: function(file){
    var self = this;
    // array of parse image files
    var newImages = [];
    var originalImages = this.state.images;
    // set unique file name
    var name = Parse.User.current().id + Date.now() + ".jpg";
    // pass in name and file that is passed in to function above
    var image = new Parse.File(name, file);
    // push image to array
    newImages.push(image);
    // Map Parse File Images
    var parseFileImages = newImages.map(function(image){
      // save each image to parse and return to array
      image.save().then(function (newImage){
          originalImages.push(newImage)
          self.setState({"images": originalImages});
        });
      return image;
     }
    );
  },
  handleSubmit: function(e){
    e.preventDefault();
    var self = this;
    var park = this.state.park;
    // set GeoPoint
    var gp = new Parse.GeoPoint({
                latitude: parseFloat(this.state.lat),
                longitude: parseFloat(this.state.lng)
            });

    // Build object
    var newParkData = {
        name: this.state.name,
        address: this.state.address,
        size: this.state.size,
        dateFounded: this.state.dateFounded,
        description: this.state.description
    }
    // Add checked amenities to park relation
    // Set to Parse Park
    park.set("newAmenities", this.state.addedAmenities);
    park.set("images", this.state.images); // grab array of parse image files and set
    park.set(newParkData); //set basic data
    park.set("location", gp); // let geopoint location
    //Save
    park.save(null, {
      success:function(newPark) {
        console.log(newPark);
        self.setState({
          "parkAdded": true
        })
      },
      error:function(obj, error) {
        console.log(error);
      }
    });
  },
  render: function(){
      var modal;
      if(this.state.showModal){
        return (<WarningModal className="add-change-warning-modal" backdrop={true} closeButton={false} show={this.state.showModal} closeModal={this.closeModal}/>)
      }
      if(!this.props.parkId){
        return (<ChooseParkModal show={this.state.showModal} closeModal={this.closeModal} />)
      }
      if(this.state.parkAdded){
        return(
          <AddedEditedModal className="add-edit-success-modal add-change-warning-modal" backdrop={true} closeButton={false} show={this.state.parkAdded} closeModal={this.closeModal}/>
        )
      }
      var imageInputs = [];
      // for every image in the array, show an image input field
      for(var i=0; i<= this.state.images.length; i++){
        var count = i;
        imageInputs.push(<EditImageInputComponent length={this.state.images.length} image={this.state.images[i]} removeImage={this.removeImage} handleFile={this.handleFile} key={count} count={count} ref={"formset"+count}/>);
      }
      // loop over allAmenities and print options to screen as checkboxes
      var newAmenity = function(amenity){
        return (
          <div key={amenity.objectId}>
            <AddCheckboxComponent editMode={this.state.editMode} addedAmenities={this.state.addedAmenities} handleCheck={this.handleCheck} amenity={amenity}/>
          </div>
        )
      }
    return (
  <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
    <div className="container add-park-form-container col-md-12">
      <h2 className="add-park-form-heading text-center">Edit a Park</h2>
      <form id="add-park-form" onSubmit={this.handleSubmit}>
        <div className="col-md-4">
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-name">park name</label>
            <input valueLink={this.linkState('name')} type="text" className="form-control" id="add-park-name" />
          </fieldset>
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-lat">latitude</label>
            <input valueLink={this.linkState('lat')} type="text" className="form-control" id="add-park-lat" />
          </fieldset>
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-lng">longitude</label>
            <input valueLink={this.linkState('lng')} type="text" className="form-control" id="add-park-lng" />
          </fieldset>
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-address">address</label>
            <input valueLink={this.linkState('address')} type="text" className="form-control" id="add-park-address" />
          </fieldset>
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-size">size</label>
            <input valueLink={this.linkState('size')} type="text" className="form-control" id="add-park-size" />
          </fieldset>
        </div>
        <div className="col-md-4">
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-date">date founded</label>
            <input valueLink={this.linkState('dateFounded')} type="text" className="form-control" id="add-park-date" />
          </fieldset>
          <fieldset className="form-group add-park-form">
            <label className="form-label" htmlFor="add-park-description">description</label>
            <textarea valueLink={this.linkState('description')} rows="5" placeholder="limit to 200 characters" className="form-control" id="add-park-description" />
          </fieldset>
          <fieldset className="form-group add-park-form">
            <label className="form-label col-md-12">images</label>
            <div className="row">
              {imageInputs}
            </div>
          </fieldset>
        </div>
        <div className="col-md-4">
          <fieldset className="form-group add-park-form">
            <div className="col-md-12 add-park-form-amenities-checkboxes-container">
              {this.state.allAmenities.map(newAmenity.bind(this))}
            </div>
          </fieldset>
        </div>
      </form>
      <button type="submit" form="add-park-form" id="add-park-form-submit-btn" className="btn btn-primary pull-right">resubmit park</button>
    </div>
  </ReactCSSTransitionGroup>
    )
  }
});

module.exports = {
  EditParkComponent: EditParkComponent
}
