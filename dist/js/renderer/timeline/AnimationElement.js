var AnimationElement, AnimationEvent, AnimationProperty;

AnimationProperty = require("./AnimationProperty.js");

AnimationEvent = require("./AnimationEvent.js");

AnimationElement = (function() {
  AnimationElement.curId = 0;

  function AnimationElement(name, dom) {
    this.name = name;
    this.dom = dom;
    this.id = AnimationElement.curId++;
    this.propList = [];
    this.isLoad = false;
  }

  AnimationElement.prototype.addProp = function(prop) {
    if (prop instanceof AnimationProperty) {
      prop.id = this.id + "-" + this.propList.length;
      return this.propList.push(prop);
    } else {
      return console.error(prop + " is not AnimationProperty class");
    }
  };

  AnimationElement.prototype.deleteProp = function(id) {
    var i, j, len, prop, results;
    i = 0;
    results = [];
    for (j = 0, len = propList.length; j < len; j++) {
      prop = propList[j];
      if (prop.id === id) {
        delete this.propList[i];
      }
      results.push(i++);
    }
    return results;
  };

  AnimationElement.prototype.genKeyDom = function(renameElement, renameProp) {
    return React.createElement("div", {
      "className": "element",
      "dir": this.id
    }, React.createElement("div", {
      "className": "target"
    }, React.createElement("p", {
      "className": "fa fa-file-text-o",
      "aria-hidden": "true"
    }), React.createElement("p", {
      "className": "name"
    }, this.name), React.createElement("p", {
      "className": "fa fa-pencil",
      "aria-hidden": "true",
      "onClick": renameElement
    })), React.createElement("div", {
      "className": "props"
    }, this.propList.map(function(prop) {
      return prop.genKeyDom(10, renameProp);
    })));
  };

  AnimationElement.prototype.genValueDom = function() {
    return React.createElement("div", {
      "className": "value"
    }, React.createElement("div", {
      "className": "prop_value"
    }), this.propList.map(function(prop) {
      return prop.genValueDom();
    }));
  };

  return AnimationElement;

})();

module.exports = AnimationElement;
