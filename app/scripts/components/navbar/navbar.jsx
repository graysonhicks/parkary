var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');
var Navbar = require('react-bootstrap').Navbar;
var ReactCSSTransitionGroup = require('../../../../node_modules/react-addons-css-transition-group');
var LoginDropdownComponent = require('./logindropdown.jsx').LoginDropdownComponent;
var SortDropdownComponent = require('./sortdropdown.jsx').SortDropdownComponent;
var FilterDropdownComponent = require('./filterdropdown.jsx').FilterDropdownComponent;
var NavLeftComponent = require('./navleft.jsx').NavLeftComponent;
var NavCenterComponent = require('./navcenter.jsx').NavCenterComponent;
var Switch = require('react-bootstrap-switch');

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
    // console.log($("#toggle-btn"));
    // $("#main-container").on("click", "#toggle-btn", function() {
    //       console.log('CLICK');
    //       $('.collapse').collapse('toggle');
    //   });

  },
  handleClick: function(){
    console.log('click');
  },
  toggle: function(state){
    // on switch change, it is call toggle
    // if its false, set location from url and navigate to parks grid view with lat and lng
    if(state === false){
      var lat = this.props.lat;
      var lng = this.props.lng;
      Backbone.history.navigate("parks/" + lat + "/" + lng, {trigger: true});
    }
    // if its true, set location from url and navigate to map view with lat and lng
    else {
      var lat = this.props.lat;
      var lng = this.props.lng;
      Backbone.history.navigate("map/" + lat + "/" + lng, {trigger: true});
    }
  },
  render: function(){
    var nav;
    // set array of different page options
    // some require the logo on the left, others require logo in the center
    var leftNavPages = ["home", "parks", "profile", "park", "search", "map", "add", "edit", "user", "request"];
    var centerNavPages = ["login", "signup"];

    // if the page passed in(this.props.page) is in the left array, then render that component inside main nav
    if(leftNavPages.indexOf(this.props.page)>(-1)) {
          // accountLinks determines which links are showing on the right side of the main navbar (search, sort, filter, etc)
          var accountLinks;
          // if on the search page
          // only show the account dropdown on the right
          if(this.props.page == "search"){
            accountLinks = (
              <ul className="nav navbar-nav navbar-right right-nav">
                <LoginDropdownComponent handleProfile={this.props.handleProfile} logout={this.props.logout} user={this.props.user} />
              </ul>
            )}
          // if on the profile, or park page
          // show search link and account dropdown
          if((this.props.page == "profile")||(this.props.page == "park")||(this.props.page == "add")||(this.props.page == "edit")||(this.props.page == "user")||(this.props.page == "request")){
            accountLinks = (
              <ul className="nav navbar-nav navbar-right right-nav">
                <li><a id="search-link" href="#search">search</a></li>
                <LoginDropdownComponent handleProfile={this.props.handleProfile} logout={this.props.logout} user={this.props.user}  />
              </ul>
            )}
          // if on parks grid or map page
          // show search, sort, filter, and account dropdown
          if((this.props.page =="parks")||(this.props.page =="map")){
            // using switchState and labelText to handle the map/grid toggle switch
            var switchState;
            var labelText;
            if(this.props.page == "parks"){
              // change switch state and labelText
              switchState = false;
              labelText = "GRID";

            }
            // opposite for map page
            if(this.props.page == "map"){
              switchState = true;
              labelText = "MAP";
            }
            var toggleSwitch = ( <li className="nav-switch-container"><Switch size="small" onColor="success" labelText={labelText} state={switchState} offColor="primary" onText="GRID" offText="MAP" onChange={this.toggle}/></li>)
            // on the parks page

            accountLinks = (
            <ul className="nav navbar-nav navbar-right right-nav sort-and-filters-list">
              <li><a className="search-link" href="#search">search</a></li>
              <FilterDropdownComponent filterAmenity={this.props.filterAmenity} parks={this.props.parks}  />
              <SortDropdownComponent
                sortHighestRated={this.props.sortHighestRated}
                sortDistance={this.props.sortDistance}
                sortPopularity={this.props.sortPopularity}
                parks={this.props.parks}
              />
              <LoginDropdownComponent handleProfile={this.props.handleProfile} logout={this.props.logout} user={this.props.user}  />
            </ul>
            )
            }

      nav = (

              <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                <div>
                  <div className="nav navbar-nav navbar-left main-logo-nav-left">
                      <li><a id="treelogocontainer" href="#"><img id="treelogo" src="images/treelogo.png" /></a></li>
                      <li><a href="#" id="parkary-name"><span id="parkbold">park</span><span id="parklight">ary</span></a></li>
                      <li id="page-name-container">
                        <span key={this.props.page} id="pagename">{this.props.page}</span>
                      </li>
                        {toggleSwitch}
                  </div>
                  <div className="navbar-collapse account-links-dropdown collapse">
                    {accountLinks}
                  </div>
                </div>
              </ReactCSSTransitionGroup>
                  )
      // <NavLeftComponent
      //   lat={this.props.lat}
      //   lng={this.props.lng}
      //   user={this.props.user}
      //   logout={this.props.logout}
      //   page={this.props.page}
      //   parks={this.state.parks}
      //   sortDistance={this.props.sortDistance}
      //   sortPopularity={this.props.sortPopularity}
      //   sortHighestRated={this.props.sortHighestRated}
      //   filterAmenity={this.props.filterAmenity}
      // />

    }
    // if the page passed in(this.props.page) is in the center array, then render that component inside main nav
    if(centerNavPages.indexOf(this.props.page)>(-1)){
      nav = (
          <div>
            <div className="navbar-brand">
              <div className="nav navbar-nav navbar-left">
                  <a id="treelogocontainer" href="#"><img id="treelogo-login" src="images/treelogo.png" /></a>
              </div>
              <div>
                 <a href="#" id="parkary-name">
                   <span id="parkbold">park</span><span id="parklight">ary</span>
                 </a>
                 <span id="pagename">{this.props.page}</span>
              </div>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right right-nav">
                <li><a href="#search">search</a></li>
              </ul>
            </div>
          </div>
     )
    }
    return(
        <nav className="navbar navbar-default navbar-fixed-top main-nav" role="navigation">
          <div className="navbar-header">
            <button type="button" id="toggle-btn" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
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
