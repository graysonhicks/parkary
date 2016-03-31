var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var NavLeftComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
      var accountLinks;
      if((this.props.page == "profile")||(this.props.page == "park")){
        accountLinks = (
          <li><a id="search-link" href="#search">search</a></li>
        )}
      return(
        <div>
          <div className="nav navbar-nav navbar-left">
              <li><a id="treelogocontainer" href="#"><img id="treelogo" src="images/treelogo.png" /></a></li>
              <li><a href="#" id="parkary-name"><span id="parkbold">park</span><span id="parklight">ary</span></a></li>
              <li id="page-name-container"><span id="pagename">{this.props.page}</span></li>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right right-nav">
              {accountLinks}
              <li><a id="account-link" href="#search">account</a></li>
            </ul>
          </div>
        </div>
            )
          }
        });

module.exports = {
  NavLeftComponent: NavLeftComponent
}
