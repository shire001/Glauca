var AnimationElement, AnimationEvent, AnimationProperty;

AnimationProperty = require("./AnimationProperty.js");

AnimationEvent = require("./AnimationEvent.js");

AnimationElement = (function() {
  AnimationElement.curId = 0;

  function AnimationElement(name) {
    this.name = name;
    this.id = "" + (AnimationElement.curId++);
    this.simpleId = "" + this.id;
    this.propList = [];
    this.isOpen = false;
    this.isSelected = false;
  }

  AnimationElement.prototype.addProp = function(prop, react) {
    var newElem;
    if (prop instanceof AnimationProperty) {
      prop.setId(this);
      prop.isRename = true;
      newElem = {
        propList: {
          "$push": [prop]
        }
      };
      return react.props.setParentState(react.updateAnimElemList(this.id, [newElem], true));
    } else {
      return console.error(prop + " is not AnimationProperty class");
    }
  };

  AnimationElement.prototype.deleteProp = function(id) {
    var i, j, len, newElem, prop, results;
    i = 0;
    results = [];
    for (j = 0, len = propList.length; j < len; j++) {
      prop = propList[j];
      if (prop.id === id) {
        newElem = {
          propList: []
        };
        newElem.propList[i] = {
          "$set": void 0
        };
        react.props.setParentState(react.updateAnimElemList(this.id, [newElem], true));
      }
      results.push(i++);
    }
    return results;
  };

  AnimationElement.prototype.compile = function() {
    var insts, j, len, prop, ref;
    insts = [];
    ref = this.propList;
    for (j = 0, len = ref.length; j < len; j++) {
      prop = ref[j];
      insts = insts.concat(prop.compile());
    }
    return insts;
  };

  return AnimationElement;

})();

module.exports = AnimationElement;
