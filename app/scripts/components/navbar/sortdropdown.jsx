var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var SortDropdownComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    return (
      <li className="dropdown">
        <a href="#" className="search-link" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">sort by <span className="caret"></span>
        </a>
          <ul id="sort-by-dropdown" className="dropdown-menu">
            <li><a className="dropdown-menu-links" onClick={this.props.sortDistance} value="distance" href="#">distance</a></li>
            <li><a className="dropdown-menu-links" onClick={this.props.sortHighestRated} value="rating" href="#">rating</a></li>
          </ul>
      </li>
          )
        }
      });

module.exports = {
  SortDropdownComponent: SortDropdownComponent
}
