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
    name: ,
    lat: ,
    lng: ,
    address: ,
    size: ,
    dateFounded: ,
    description: ,
    amenities: [
      shelter: ,
      playground: ,
      waterFeature: ,
      dogPark: ,
      tennis: ,
      basketball: ,
      grassyArea: ,
      baseball: ,
      soccer: ,
      trail:
    ],
    reviews: [
      {
        user: ,
        rating: ,
        comments:
      }

    ],
    images: [
      {
        url: ,
        description:
      }
    ]
  }
});
