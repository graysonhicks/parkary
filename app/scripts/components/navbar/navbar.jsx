var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');

var NavLeftComponent = require('./navleft.jsx').NavLeftComponent;
var NavCenterComponent = require('./navcenter.jsx').NavCenterComponent;

var NavbarComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  componentWillMount: function(){
    this.setState({
      parks: this.props.parks
    })
  },
  componentDidMount: function(){
    // if the array is empty, make sure search has been return
    // this is in case someone navigates by url only and no search bar is used with the google geocode
    if(this.props.page === "parks"){
        if(this.state.parks.length < 1){
          this.props.search();
        }
    }

  },
  render: function(){
    var nav;
    // set array of different page options
    // some require the logo on the left, others require logo in the center
    var leftNavPages = ["home", "parks", "profile", "park", "search", "map", "add", "edit"];
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
        parks={this.state.parks}
        sortDistance={this.props.sortDistance}
        sortHighestRated={this.props.sortHighestRated}
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
