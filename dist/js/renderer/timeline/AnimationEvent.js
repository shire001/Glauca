var AnimationElement, AnimationEvent, AnimationProperty, AttrDict;

AnimationProperty = require("./AnimationProperty.js");

AnimationElement = require("./AnimationElement.js");

AttrDict = require("../AttrDict.js");

AnimationEvent = (function() {
  var id, simpleId;

  id = -1;

  simpleId = null;

  function AnimationEvent(target1, startValue, endValue, time, duration, bezier) {
    this.target = target1;
    this.startValue = startValue;
    this.endValue = endValue;
    this.time = time;
    this.duration = duration;
    this.bezier = bezier;
  }

  AnimationEvent.prototype.setId = function() {
    this.id = this.target.id + "-e" + this.target.eventList.length;
    return this.simpleId = "e" + this.target.eventList.length;
  };

  AnimationEvent.prototype.compile = function() {
    var endVars, startVars, target;
    target = "window.element['" + (this.target.dom.getAttribute("name")) + "']";
    if (AttrDict.includes(this.target.name)) {
      startVars = "{attr:{" + this.target.name + ":" + this.startValue + "}}";
      endVars = "{attr:{" + this.target.name + ":" + this.endValue + "}}";
    } else {
      startVars = "{" + this.target.name + ":" + this.startValue + "}";
      endVars = "{" + this.target.name + ":" + this.endValue + "}";
    }
    return " .fromTo(" + target + ", " + this.duration + ", " + startVars + ", " + endVars + ", " + this.time + ")\n";
  };

  return AnimationEvent;

})();

module.exports = AnimationEvent;
