window.jQuery = $ = require('jquery');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var Parks = Backbone.Collection.extend({

  model: Park

});

var Park = Backbone.Model.extend({
  defaults: {
        name: "",
        lat: 0,
        lng: 0,
        address: "",
        size: 0,
        dateFounded: "",
        description: "",
        amenities: [
          shelter: false,
          playground: false,
          waterFeature: false,
          dogPark: false,
          tennis: false,
          basketball: false,
          grassyArea: false,
          baseball: false,
          soccer: false,
          trail: false
        ],
        reviews: [
          {
            user: "",
            rating: 0,
            comments: ""
          }

        ],
        images: [
          {
            url: "",
            description: ""
          }
        ]
  }
});
