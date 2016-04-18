var Backbone = require('backbone');
var React = require('react');
var ShareButtons = require('react-share').ShareButtons;
var ShareCounts = require('react-share').ShareCounts;
var generateShareIcon = require('react-share').generateShareIcon;
var TwitterShareButton = ShareButtons.TwitterShareButton;
var TwitterShareCount = ShareCounts.TwitterShareCount;
var TwitterIcon = generateShareIcon('twitter');
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

var TwitterShareComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function() {
    var shareUrl = 'https://parkary.com/' + Backbone.history.fragment;
    var message = "Check out this awesome park I found on parkary.com!"
    var twitterTooltip = (
      <Tooltip id="twitter-tooltip">Share with Twitter</Tooltip>
    )
    var message;
    var title;
    if(this.props.page === "park"){
      title = "Check out this awesome park I found on parkary.com! - " + this.props.park.get("name");
      message = "Check out this awesome park I found on parkary.com!";
    }
    if(this.props.page === "profile"){
      title = "Check out my profile on parkary.com! Parkary - " + this.props.user.get("username");
      message = "Check out my profile on parkary.com!";
    }
    return (
          <OverlayTrigger placement="bottom" overlay={twitterTooltip}>
            <div className="twitter-share-container">
              <TwitterShareButton
                url={shareUrl}
                title={title}
                message={message}
                className="social-icons twitter-share-button">
                <TwitterIcon
                  size={20}
                 />
              </TwitterShareButton>
            </div>
          </OverlayTrigger>
      )
    }
      });


module.exports = {
  TwitterShareComponent: TwitterShareComponent
}
