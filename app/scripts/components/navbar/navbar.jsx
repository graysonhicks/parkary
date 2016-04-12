var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');


var NavLeftComponent = require('./navleft.jsx').NavLeftComponent;
var NavCenterComponent = require('./navcenter.jsx').NavCenterComponent;

var NavbarComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    var nav;
    // set array of different page options
    // some require the logo on the left, others require logo in the center
    var leftNavPages = ["home", "parks", "profile", "park", "search", "map"];
    var centerNavPages = ["login", "signup"];

    // if the page passed in(this.props.page) is in the left array, then render that component inside main nav
    if(leftNavPages.indexOf(this.props.page)>(-1)) {
      nav = (
      <NavLeftComponent
        lat={this.props.lat}
        lng={this.props.lng}
        user={this.props.user}
        logout={this.props.logout}
        page={this.props.page}
      />
      )
    }
    // if the page passed in(this.props.page) is in the center array, then render that component inside main nav
    if(centerNavPages.indexOf(this.props.page)>(-1)){
      nav = (
      <NavCenterComponent page={this.props.page} />
     )
    }
    return(
        <nav className="navbar navbar-default navbar-fixed-top main-nav" role="navigation">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>

              {nav}

        </nav>

      )
    }
  });

module.exports = {
  NavbarComponent: NavbarComponent
}
