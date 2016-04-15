var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var ReactCSSTransitionGroup = require('../../../../node_modules/react-addons-css-transition-group');
var LoginDropdownComponent = require('./logindropdown.jsx').LoginDropdownComponent;
var SortDropdownComponent = require('./sortdropdown.jsx').SortDropdownComponent;
var FilterDropdownComponent = require('./filterdropdown.jsx').FilterDropdownComponent;

var Switch = require('react-bootstrap-switch');

var NavLeftComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
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
      // accountLinks determines which links are showing on the right side of the main navbar (search, sort, filter, etc)
      var accountLinks;
      // if on the search page
      // only show the account dropdown on the right
      if(this.props.page == "search"){
        accountLinks = (
          <ul className="nav navbar-nav navbar-right right-nav">
            <LoginDropdownComponent logout={this.props.logout} user={this.props.user} />
          </ul>
        )}
      // if on the profile, or park page
      // show search link and account dropdown
      if((this.props.page == "profile")||(this.props.page == "park")||(this.props.page == "add")||(this.props.page == "edit")){
        accountLinks = (
          <ul className="nav navbar-nav navbar-right right-nav">
            <li><a id="search-link" href="#search">search</a></li>
            <LoginDropdownComponent logout={this.props.logout} user={this.props.user}  />
          </ul>
        )}
      // if on parks grid or map page
      // show search, sort, filter, and account dropdown
      if((this.props.page =="parks")||(this.props.page =="map")){
        // using switchState and labelText to handle the map/grid toggle switch
        var switchState;
        var labelText;
        // on the parks page
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
        accountLinks = (
        <ul className="nav navbar-nav navbar-right right-nav">
          <li><Switch size="small" onColor="success" labelText={labelText} state={switchState} offColor="primary" onText="GRID" offText="MAP" onChange={this.toggle}/></li>
          <li><a className="search-link" href="#search">search</a></li>
          <FilterDropdownComponent parks={this.props.parks}  />
          <SortDropdownComponent
            sortHighestRated={this.props.sortHighestRated}
            sortDistance={this.props.sortDistance}
            parks={this.props.parks}
          />
          <LoginDropdownComponent logout={this.props.logout} user={this.props.user}  />
        </ul>
        )
        }
      return(
        <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <div>
            <div className="nav navbar-nav navbar-left">
                <li><a id="treelogocontainer" href="#"><img id="treelogo" src="images/treelogo.png" /></a></li>
                <li><a href="#" id="parkary-name"><span id="parkbold">park</span><span id="parklight">ary</span></a></li>
                <li id="page-name-container">
                  <span key={this.props.page} id="pagename">{this.props.page}</span>
                </li>
            </div>
            <div className="navbar-collapse collapse">
              {accountLinks}
            </div>
          </div>
        </ReactCSSTransitionGroup>
            )
          }
        });

module.exports = {
  NavLeftComponent: NavLeftComponent
}
