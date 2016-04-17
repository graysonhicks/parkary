var _ = require('underscore');
var Parse = require('parse');

function pythag(x, y){
  var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  return dist;
}

module.exports = {
  rating: function(parks){
    // sort by descending rating
    console.log(parks);
    parks = _.sortBy(parks, function(park){
      return park.get("rating");
    });
    //reverse to ascending
    parks.reverse();
    return parks;
  },
  popularity: function(parks){
    // sort by descending rating
    console.log(parks);
    parks = _.sortBy(parks, function(park){
      return park.get("aggregateRating");
    });
    //reverse to ascending
    parks.reverse();
    return parks;
  },
  distance: function(parks, center){
    // sort by  rating
    console.log('center', center);
    console.log("parklocation", parks);
    var mapLat = center.latitude;
    var mapLon = center.longitude;
    parks = _.sortBy(parks, function(park){
      var parkLat = park.get("location").latitude;
      var parkLon = park.get("location").longitude;
      var xDist = parkLat - mapLat;
      var yDist = parkLon - mapLon;
      var distance = pythag(xDist, yDist);
      return distance * -1;
    });
    //reverse to ascending
    parks.reverse();
    return parks;
  }
}
