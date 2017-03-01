document.ondragover = document.ondrop = function(e) {
  e.preventDefault();
  return false;
};

window.Timeline = null;

window.onload = function() {
  var Contents, FileView, MainView, PropertyView, React, ReactDOM, Timeline, ipcRenderer, ref, remote, update;
  update = require('react-addons-update');
  ref = require('electron'), ipcRenderer = ref.ipcRenderer, remote = ref.remote;
  React = require('react');
  ReactDOM = require('react-dom');
  MainView = require('./js/renderer/MainView');
  FileView = require('./js/renderer/FileView');
  PropertyView = require('./js/renderer/PropertyView');
  Timeline = require('./js/renderer/Timeline');
  Contents = React.createClass({
    setProperty: function(type, item) {
      return this.setState({
        type: type,
        item: item
      });
    },
    getInitialState: function() {
      return {
        projectPath: null,
        type: null,
        item: null,
        animElemList: [],
        curTime: 0
      };
    },
    componentDidMount: function() {
      ipcRenderer.on('requestPath-reply', (function(_this) {
        return function(err, path) {
          if (err != null) {
            console.log(err);
          }
          console.log(path);
          return _this.setState({
            projectPath: path
          });
        };
      })(this));
      ipcRenderer.send('requestPath-message', '');
      return ipcRenderer.on('capture', (function(_this) {
        return function(err, type) {
          return console.log(type);
        };
      })(this));
    },
    updateState: function(newState, callback) {
      return this.setState(newState, callback);
    },
    addAnimElem: function(elem) {
      var newState;
      newState = {
        animElemList: {
          "$push": [elem]
        }
      };
      newState = update(this.state, newState);
      return this.setState(newState);
    },
    render: function() {
      return React.createElement("div", {
        "id": "Contents"
      }, React.createElement(MainView, {
        "path": this.state.projectPath,
        "Action": {
          setParentState: this.updateState,
          addAnimElem: this.addAnimElem
        }
      }), React.createElement(FileView, {
        "path": this.state.projectPath,
        "Action": {
          setProperty: this.setProperty
        }
      }), React.createElement(PropertyView, {
        "type": this.state.type,
        "item": this.state.item
      }), React.createElement(Timeline, {
        "parentState": this.state,
        "curTime": this.state.curTime,
        "setParentState": this.updateState
      }));
    }
  });
  return ReactDOM.render(React.createElement(Contents, null), document.getElementById('Top'));
};
