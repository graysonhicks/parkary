var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Parse = require('parse');
var ParseReact = require('parse-react');
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

Parse.initialize("parkary");
Parse.serverURL = 'http://parkary.herokuapp.com';

var FacebookShareComponent = require('./facebookshare.jsx').FacebookShareComponent;
var TwitterShareComponent = require('./twittershare.jsx').TwitterShareComponent;

var SocialIconsComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    var heartClass;
    var addRemove;
    // this park is already a favorite
    if(this.props.favorite){
      // show the heart as red
      heartClass="heart-red";
      // and adjust tooltip text
      addRemove="Remove from";
    } else {
      // if not then show heart as gray
      heartClass="heart-gray";
      // and adjust text
      addRemove="Add to";
    }
    // social icon tooltips
    var favoriteTooltip = (
      <Tooltip id="favorite-tooltip">{addRemove} favorites</Tooltip>
    )


    var emailTooltip = (
      <Tooltip id="email-tooltip">Share with Email</Tooltip>
    )
    // on heart button click, run toggleFavorite that adds or removes from parse array and toggles state
      return (
          <ul className="park-card-social-icons list-inline">
            <li className="list-group-item social-icon-list-items">
              <OverlayTrigger placement="bottom" overlay={emailTooltip}>
                <i className="fa fa-envelope social-icons"></i>
              </OverlayTrigger>
            </li>
            <li className="list-group-item social-icon-list-items">
                <TwitterShareComponent park={this.props.park} />
            </li>
            <li className="list-group-item social-icon-list-items">
                <FacebookShareComponent park={this.props.park} />
            </li>
            <li className="list-group-item social-icon-list-items">
              <OverlayTrigger placement="bottom" overlay={favoriteTooltip}>
                <i onClick={this.props.toggleFavorite} className={"fa fa-heart social-icons park-card-heart " + heartClass}></i>
              </OverlayTrigger>
             </li>
          </ul>
             )
          }
      });

module.exports = {
  SocialIconsComponent: SocialIconsComponent
}
