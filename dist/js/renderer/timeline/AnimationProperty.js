var AnimationElement, AnimationEvent, AnimationProperty;

AnimationElement = require("./AnimationElement.js");

AnimationEvent = require("./AnimationEvent.js");

AnimationProperty = (function() {
  function AnimationProperty(name, target, isProperty) {
    this.name = name;
    this.target = target;
    this.isProperty = isProperty != null ? isProperty : false;
    this.id = null;
    this.propList = [];
    this.eventList = [];
    this.isLoad = false;
  }

  AnimationProperty.prototype.addEvent = function(event) {
    if (event instanceof AnimationEvent) {
      event.id = this.id + "-" + this.eventList.length;
      return eventList.push(event);
    } else {
      return console.error(event + " is not AnimationEvent class");
    }
  };

  AnimationProperty.prototype.deleteEvent = function(id) {
    var event, i, j, len, ref, results;
    i = 0;
    ref = this.eventList;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      event = ref[j];
      if (this.eventList[i].id === id) {
        delete this.eventList[i];
      }
      results.push(i++);
    }
    return results;
  };

  AnimationProperty.prototype.genKeyDom = function(indent, renameProp) {
    return React.createElement("div", {
      "className": "prop",
      "dir": this.id
    }, React.createElement("div", {
      "className": "target"
    }, React.createElement("p", {
      "className": "indent",
      "width": indent + "px"
    }), React.createElement("p", {
      "className": (this.isProperty ? "fa fa-sliders" : "fa fa-magic"),
      "aria-hidden": "true"
    }), React.createElement("p", {
      "className": "name"
    }, this.name), React.createElement("p", {
      "className": "fa fa-pencil",
      "aria-hidden": "true",
      "onClick": renameProp
    })), React.createElement("div", {
      "className": "props"
    }, this.propList.map(function(prop) {
      return prop.genKeyDom(indent + 10);
    })));
  };

  AnimationProperty.prototype.genValueDom = function() {
    return React.createElement("div", {
      "className": "prop_value",
      "value": this.id
    }, this.propList.map(function(prop) {
      return prop.genValueDom();
    }));
  };

  return AnimationProperty;

})();

module.exports = AnimationProperty;
