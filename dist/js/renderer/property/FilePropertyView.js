var React;

React = require('react');

module.exports = React.createClass({
  render: function() {
    return React.createElement("ul", {
      "id": "FilePropertyView"
    }, React.createElement("li", null, "name: " + this.props.item.name), React.createElement("li", {
      "className": "property-image"
    }, React.createElement("img", {
      "src": this.props.item.path,
      "width": "100%"
    })));
  }
});
