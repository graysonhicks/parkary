var Backbone = require('backbone');
var React = require('react');
var ShareButtons = require('react-share').ShareButtons;
var ShareCounts = require('react-share').ShareCounts;
var generateShareIcon = require('react-share').generateShareIcon;
var FacebookShareButton = ShareButtons.FacebookShareButton;
var FacebookIcon = generateShareIcon('facebook');
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

var FacebookShareComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function() {
    var facebookTooltip = (
      <Tooltip id="facebook-tooltip">Share with Facebook</Tooltip>
    )
    var shareUrl = 'https://parkary.com/' + Backbone.history.fragment;
    var message;
    var title;
    if(this.props.page === "park"){
      title = "Check out this awesome park I found on parkary.com! Parkary - " + this.props.park.get("name");
      message = "Check out this awesome park I found on parkary.com!";
    }
    if(this.props.page === "profile"){
      title = "Check out my profile on parkary.com! - " + this.props.user.get("username");
      message = "Check out my profile on parkary.com!";
    }
    return (
      <OverlayTrigger placement="bottom" overlay={facebookTooltip}>
        <div className="facebook-share-container">
          <FacebookShareButton
            url={shareUrl}
            title={title}
            message={message}
            className="social-icons facebook-share-button">
            <FacebookIcon
              size={20}
             />
          </FacebookShareButton>
        </div>
      </OverlayTrigger>
      )
    }
      });


module.exports = {
  FacebookShareComponent: FacebookShareComponent
}
