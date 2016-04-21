var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var ReactCSSTransitionGroup = require('../../../../node_modules/react-addons-css-transition-group');

var AddedEditedUserModal = require('./addedediteduser.jsx').AddedEditedUserModal;

var LoginFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  getInitialState: function(){
    return {
      username: '',
      password: ''
    }
  },
  login: function(e){
    e.preventDefault();
    // console.log(this.state);
    this.resetState();
    this.props.login(this.state);
  },
  resetState: function(){
    this.setState({
      username: '',
      password: ''
    });
  },
  openModal: function(){
    this.setState({
      showModal: true
    })
  },
  closeModal: function(){
    this.setState({
      showModal: false
    })
    Backbone.history.navigate("", {trigger: true});
  },
  render: function(){
    var modal;
    if(this.props.userLoginSuccess){
      return (
        <AddedEditedUserModal page={this.props.page} className="add-change-warning-modal" backdrop={true} closeButton={false} show={this.props.userLoginSuccess} closeModal={this.closeModal}/>
      )
    }
    return (
  <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
    <div className="container login-form-container">
      <form onSubmit={this.login}>
        <fieldset className="form-group login-form">
          <label className="form-label" htmlFor="login-username">username</label>
          <input valueLink={this.linkState('username')} type="text" className="form-control" id="login-username" />
        </fieldset>
        {modal}
        <fieldset className="form-group">
          <label className="form-label" htmlFor="login-password">password</label>
          <input valueLink={this.linkState('password')} type="password" className="form-control" id="login-password" />
        </fieldset>
        <fieldset className="form-group">
          <a className="login-signup-reminder" href="#signup">Don't have an account yet? Click here to sign up.</a>
        </fieldset>
        <button type="submit" id="login-form-submit-btn" className="btn btn-primary pull-right">login</button>
      </form>
    </div>
  </ReactCSSTransitionGroup>
    )
  }
});

module.exports = {
  LoginFormComponent: LoginFormComponent
}
