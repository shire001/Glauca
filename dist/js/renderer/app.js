window.onload = function() {
  var Contents, FileView, FxView, MainView, React, ReactDOM, Timeline, remote;
  remote = require('remote');
  React = require('react');
  ReactDOM = require('react-dom');
  MainView = React.createClass({
    render: function() {
      return React.createElement("div", {
        "id": "MainView"
      }, React.createElement("svg", null));
    }
  });
  FileView = React.createClass({
    render: function() {
      return React.createElement("div", {
        "id": "FileView"
      });
    }
  });
  FxView = React.createClass({
    render: function() {
      return React.createElement("div", {
        "id": "FxView"
      });
    }
  });
  Timeline = React.createClass({
    render: function() {
      return React.createElement("div", {
        "id": "Timeline"
      });
    }
  });
  Contents = React.createClass({
    render: function() {
      return React.createElement("div", {
        "id": "Contents"
      }, React.createElement(MainView, null), React.createElement(FileView, null), React.createElement(FxView, null), React.createElement(Timeline, null));
    }
  });
  return ReactDOM.render(React.createElement(Contents, null), document.getElementById('Top'));
};
