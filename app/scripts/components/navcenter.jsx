var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var ReactCSSTransitionGroup = require('../../../node_modules/react-addons-css-transition-group');

var NavCenterComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
      var accountLinks;
      return(
      <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
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
      </ReactCSSTransitionGroup>
            )
          }
        });

module.exports = {
  NavCenterComponent: NavCenterComponent
}
