document.ondragover = document.ondrop = function(e) {
  e.preventDefault();
  return false;
};

window.onload = function() {
  var Contents, FileView, FxView, MainView, React, ReactDOM, Timeline, ipcRenderer, remote;
  remote = require('remote');
  ipcRenderer = require('electron').ipcRenderer;
  React = require('react');
  ReactDOM = require('react-dom');
  MainView = require('./js/renderer/MainView');
  FileView = require('./js/renderer/FileView');
  FxView = require('./js/renderer/FxView');
  Timeline = require('./js/renderer/Timeline');
  Contents = React.createClass({
    getInitialState: function() {
      return {
        projectPath: null
      };
    },
    componentDidMount: function() {
      ipcRenderer.on('requestPath-reply', (function(_this) {
        return function(e, path) {
          console.log(e);
          console.log(path);
          return _this.setState({
            projectPath: path
          });
        };
      })(this));
      return ipcRenderer.send('requestPath-message', '');
    },
    render: function() {
      return React.createElement("div", {
        "id": "Contents"
      }, React.createElement(MainView, null), React.createElement(FileView, {
        "path": this.state.projectPath
      }), React.createElement(FxView, null), React.createElement(Timeline, null));
    }
  });
  return ReactDOM.render(React.createElement(Contents, null), document.getElementById('Top'));
};
