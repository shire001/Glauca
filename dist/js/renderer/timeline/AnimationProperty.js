var AnimationElement, AnimationEvent, AnimationProperty;

AnimationElement = require("./AnimationElement.js");

AnimationEvent = require("./AnimationEvent.js");

AnimationProperty = (function() {
  function AnimationProperty(name, element, isProperty) {
    this.name = name;
    this.element = element;
    this.isProperty = isProperty != null ? isProperty : false;
    this.id = null;
    this.propList = [];
    this.eventList = [];
    this.isOpen = false;
    this.isSelected = false;
  }

  AnimationProperty.prototype.setId = function(parent) {
    this.simpleId = "" + parent.propList.length;
    return this.id = parent.id + "-" + this.simpleId;
  };

  AnimationProperty.prototype.addEvent = function(event, react) {
    var newElem;
    if (event instanceof AnimationEvent) {
      newElem = {
        eventList: {
          "$push": [event]
        }
      };
      return react.props.setParentState(react.updateAnimElemList(this.id, [newElem], true));
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

  AnimationProperty.prototype.compile = function() {
    var event, insts, j, k, len, len1, prop, ref, ref1;
    insts = [];
    ref = this.propList;
    for (j = 0, len = ref.length; j < len; j++) {
      prop = ref[j];
      insts = insts.concat(prop.compile());
    }
    ref1 = this.eventList;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      event = ref1[k];
      insts.push(event.compile());
    }
    return insts;
  };

  return AnimationProperty;

})();

module.exports = AnimationProperty;
