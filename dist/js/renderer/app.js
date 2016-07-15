window.onload = function() {
  var Contents, FileView, FxView, MainView, React, ReactDOM, Timeline, remote;
  remote = require('remote');
  React = require('react');
  ReactDOM = require('react-dom');
  MainView = require('./js/renderer/MainView');
  FileView = require('./js/renderer/FileView');
  FxView = require('./js/renderer/FxView');
  Timeline = require('./js/renderer/Timeline');
  Contents = React.createClass({
    render: function() {
      return React.createElement("div", {
        "id": "Contents"
      }, React.createElement(MainView, null), React.createElement(FileView, null), React.createElement(FxView, null), React.createElement(Timeline, null));
    }
  });
  return ReactDOM.render(React.createElement(Contents, null), document.getElementById('Top'));
};
