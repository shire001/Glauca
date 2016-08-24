var AnimationElement, AnimationEvent, AnimationProperty, React, update;

React = require('react');

update = require('react-addons-update');

AnimationElement = require("./timeline/AnimationElement.js");

AnimationProperty = require("./timeline/AnimationProperty.js");

AnimationEvent = require("./timeline/AnimationEvent.js");

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
          width: image.width,
          animElem: null
        };
        _this.props.Action.addAnimElem(_this.createNewAnimElem(item));
        _this.setState({
          items: _this.state.items.concat(item)
        });
        return console.log(_this.props.path, path);
      };
    })(this);
  },
  createNewAnimElem: function(item) {
    var i, len, newElem, newEvent, newProp, prop, ref;
    newElem = new AnimationElement(item.path);
    item.animElem = newElem;
    ref = ["x", "y", "height", "width"];
    for (i = 0, len = ref.length; i < len; i++) {
      prop = ref[i];
      newProp = new AnimationProperty(prop, newElem, true);
      newProp.setId(newElem);
      newEvent = new AnimationEvent(newProp, item[prop], item[prop], 0, 0, null);
      newEvent.setId();
      newProp.eventList.push(newEvent);
      newElem.propList.push(newProp);
    }
    return newElem;
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
          "width": item.width,
          "id": "AnimationElement#" + item.animElem.id,
          "key": "AnimationElement" + item.animElem.id
        });
      };
    })(this));
    return React.createElement("div", {
      "id": "MainView",
      "onDrop": this.onDropItem
    }, React.createElement("svg", null, items));
  }
});
