var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var ReactCSSTransitionGroup = require('../../../../node_modules/react-addons-css-transition-group');
var LoginDropdownComponent = require('./logindropdown.jsx').LoginDropdownComponent;
var Switch = require('react-bootstrap-switch');

var NavLeftComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  toggle: function(state){
    console.log(state);
    if(state === false){
      Backbone.history.navigate("parks", {trigger: true});
    } else {
      Backbone.history.navigate("map", {trigger: true});
    }
  },
  render: function(){
      var accountLinks;

      if(this.props.page == "search"){
        accountLinks = (
          <ul className="nav navbar-nav navbar-right right-nav">
            <LoginDropdownComponent logout={this.props.logout} user={this.props.user} />
          </ul>
        )}
      if((this.props.page == "profile")||(this.props.page == "park")||(this.props.page == "home")){
        accountLinks = (
          <ul className="nav navbar-nav navbar-right right-nav">
            <li><a id="search-link" href="#search">search</a></li>
            <LoginDropdownComponent logout={this.props.logout} user={this.props.user}  />
          </ul>
        )}
      if((this.props.page =="parks")||(this.props.page =="map")){
        accountLinks = (
        <ul className="nav navbar-nav navbar-right right-nav">
          <li><Switch size="small" onColor="success" offColor="primary" onText="GRID" offText="MAP" onChange={this.toggle}/></li>
          <li><a id="search-link" href="#search">search</a></li>
          <li><a id="search-link" href="#">filter by</a></li>
          <li><a id="search-link" href="#">sort by</a></li>
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
