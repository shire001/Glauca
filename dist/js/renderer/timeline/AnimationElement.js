var AnimationElement, AnimationEvent, AnimationProperty;

AnimationProperty = require("./AnimationProperty.js");

AnimationEvent = require("./AnimationEvent.js");

AnimationElement = (function() {
  AnimationElement.curId = 0;

  function AnimationElement(name, dom) {
    this.name = name;
    this.dom = dom;
    this.id = "" + (AnimationElement.curId++);
    this.simpleId = "" + this.id;
    this.propList = [];
    this.isOpen = false;
    this.isSelected = false;
  }

  AnimationElement.prototype.addProp = function(prop) {
    if (prop instanceof AnimationProperty) {
      prop.setId(this);
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

  return AnimationElement;

})();

module.exports = AnimationElement;
