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

    var leftNavPages = ["home", "parks", "profile", "park", "search"];
    var centerNavPages = ["login", "signup"];


    if(leftNavPages.indexOf(this.props.page)>(-1)) {
      nav = (
      <NavLeftComponent user={this.props.user} logout={this.props.logout} page={this.props.page} />
      )
    }
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
