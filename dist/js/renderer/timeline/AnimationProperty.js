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
    this.isOpen = false;
    this.isSelected = false;
  }

  AnimationProperty.prototype.setId = function(parent) {
    this.simpleId = "" + parent.propList.length;
    return this.id = parent.id + "-" + this.simpleId;
  };

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

  return AnimationProperty;

})();

module.exports = AnimationProperty;
