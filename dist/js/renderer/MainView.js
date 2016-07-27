var React;

React = require('react');

module.exports = React.createClass({
  render: function() {
    return React.createElement("div", {
      "id": "MainView"
    }, React.createElement("svg", null));
  }
});
