var Backbone = require('backbone');
var React = require('react');
var ShareButtons = require('react-share').ShareButtons;
var ShareCounts = require('react-share').ShareCounts;
var generateShareIcon = require('react-share').generateShareIcon;
var FacebookShareButton = ShareButtons.FacebookShareButton;
var FacebookShareCount = ShareCounts.FacebookShareCount;
var FacebookIcon = generateShareIcon('facebook');
var TwitterShareButton = ShareButtons.TwitterShareButton;
var TwitterShareCount = ShareCounts.TwitterShareCount;
var TwitterIcon = generateShareIcon('twitter');

var FacebookShareComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function() {
    var shareUrl = 'http://github.com';
    var title = 'GitHub';

    return (
      <div className="Demo__container">
        <div className="Demo__some-network">
          <FacebookShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button">
            <FacebookIcon
              size={32}
             />
          </FacebookShareButton>

          <FacebookShareCount
            url={shareUrl}
            className="Demo__some-network__share-count">

          </FacebookShareCount>
        </div>

      </div>
      )
    }
      });


module.exports = {
  FacebookShareComponent: FacebookShareComponent
}
