var FilePropertyView, React;

React = require('react');

FilePropertyView = require('./property/FilePropertyView.js');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      type: null,
      item: null
    };
  },
  render: function() {
    var item;
    if (this.props.type != null) {
      item = (function() {
        switch (this.props.type) {
          case "file":
            return React.createElement(FilePropertyView, {
              "item": this.props.item
            });
        }
      }).call(this);
    }
    return React.createElement("div", {
      "id": "PropertyView"
    }, item);
  }
});
