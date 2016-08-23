var AnimationElement, AnimationEvent, AnimationProperty;

AnimationElement = require("./AnimationElement.js");

AnimationEvent = require("./AnimationEvent.js");

AnimationProperty = (function() {
  function AnimationProperty(name, dom, isProperty) {
    this.name = name;
    this.dom = dom;
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
    var code, event, j, k, len, len1, prop, ref, ref1;
    code = "";
    ref = this.propList;
    for (j = 0, len = ref.length; j < len; j++) {
      prop = ref[j];
      code += prop.compile();
    }
    ref1 = this.eventList;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      event = ref1[k];
      code += event.compile();
    }
    return code;
  };

  return AnimationProperty;

})();

module.exports = AnimationProperty;
