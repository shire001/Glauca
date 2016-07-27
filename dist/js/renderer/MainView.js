var React;

React = require('react');

module.exports = React.createClass({
  render: function() {
    return React.createElement("div", {
      "id": "MainView"
    }, React.createElement("svg", null, React.createElement("circle", {
      "id": "e1",
      "cx": "50",
      "cy": "50",
      "r": "50",
      "stroke": "blue",
      "fill": "white",
      "strokeWidth": "5"
    }), React.createElement("circle", {
      "id": "e2",
      "cx": "150",
      "cy": "50",
      "r": "50",
      "stroke": "red",
      "fill": "white",
      "strokeWidth": "5"
    }), React.createElement("circle", {
      "id": "e3",
      "cx": "250",
      "cy": "50",
      "r": "50",
      "stroke": "green",
      "fill": "white",
      "strokeWidth": "5"
    })));
  }
});
