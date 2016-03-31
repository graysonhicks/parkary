var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var NavbarComponent = require('./navbar.jsx').NavbarComponent;
var LoginSignUpFormComponent = require('./loginsignupform.jsx').LoginSignUpFormComponent;
var SearchFormComponent = require('./searchform.jsx').SearchFormComponent;

var InterfaceComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
  return {
    router: this.props.router
    }
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }).bind(this);
    this.state.router.on('route', this.callback);
  },
  componentWillUnmount: function(){
    this.state.router.off('route', this.callback);
  },
  render: function(){
    var body;
    if((this.state.router.current == "login")||(this.state.router.current == "signup")){
      body = (
        <LoginSignUpFormComponent page={this.state.router.current} />
      )
    }
    if(this.state.router.current == "search"){
      body = (
        <SearchFormComponent page={this.state.router.current} />
      )
    }
    return(
        <div>
         <NavbarComponent page={this.state.router.current} />
           {body}
        </div>
      )
    }
});
module.exports = {
  InterfaceComponent: InterfaceComponent
}
