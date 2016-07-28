var React, fs, mime;

React = require('react');

mime = require('mime-types');

fs = require('fs');

module.exports = React.createClass({
  render: function() {
    var cn, content, m, ref, size;
    m = mime.lookup(this.props.item.name);
    switch ((ref = m.split("/")) != null ? ref[0] : void 0) {
      case "image":
        cn = "property-image";
        content = React.createElement("img", {
          "src": this.props.item.path,
          "width": "100%"
        });
        break;
      case "text":
        cn = "property-text";
        content = React.createElement("pre", null, " ", fs.readFileSync(this.props.item.path).toString(), " ");
        break;
      case "audio":
        cn = "property-audio";
        content = React.createElement("audio", {
          "src": this.props.item.path,
          "controls": true
        });
        break;
      default:
        console.log(m);
    }
    size = Math.floor(this.props.item.size / 1000000) > 0 ? ((this.props.item.size / 1000000).toFixed(1)) + " MB" : Math.floor(this.props.item.size / 1000) > 0 ? (Math.floor(this.props.item.size / 1000)) + " kB" : this.props.item.size + " B";
    return React.createElement("ul", {
      "id": "FilePropertyView"
    }, React.createElement("li", null, "name: " + this.props.item.name), React.createElement("li", null, "size: " + size), React.createElement("li", {
      "className": cn
    }, content));
  }
});
