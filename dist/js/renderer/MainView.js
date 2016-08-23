var React;

React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      items: []
    };
  },
  onDropItem: function(e) {
    var image, path, x, y;
    e.preventDefault();
    e.stopPropagation();
    image = new Image();
    path = e.dataTransfer.getData("text");
    image.src = "" + this.props.path + path;
    x = e.nativeEvent.offsetX;
    y = e.nativeEvent.offsetY;
    return image.onload = (function(_this) {
      return function() {
        var item;
        item = {
          path: path,
          x: x - image.width / 2,
          y: y - image.height / 2,
          height: image.height,
          width: image.width
        };
        _this.setState({
          items: _this.state.items.concat(item)
        });
        return console.log(_this.props.path, path);
      };
    })(this);
  },
  render: function() {
    var items;
    items = this.state.items.map((function(_this) {
      return function(item) {
        return React.createElement("image", {
          "xlinkHref": "" + _this.props.path + item.path,
          "x": item.x,
          "y": item.y,
          "height": item.height,
          "width": item.width
        });
      };
    })(this));
    return React.createElement("div", {
      "id": "MainView",
      "onDrop": this.onDropItem
    }, React.createElement("svg", null, React.createElement("circle", {
      "name": "e1",
      "cx": "50",
      "cy": "50",
      "r": "50",
      "stroke": "blue",
      "fill": "white",
      "strokeWidth": "5"
    }), React.createElement("circle", {
      "name": "e2",
      "cx": "150",
      "cy": "50",
      "r": "50",
      "stroke": "red",
      "fill": "white",
      "strokeWidth": "5"
    }), React.createElement("circle", {
      "name": "e3",
      "cx": "250",
      "cy": "50",
      "r": "50",
      "stroke": "green",
      "fill": "white",
      "strokeWidth": "5"
    }), items));
  }
});
