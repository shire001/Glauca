var AnimationElement, AnimationEvent, AnimationProperty, AttrDict;

AnimationProperty = require("./AnimationProperty.js");

AnimationElement = require("./AnimationElement.js");

AttrDict = require("../AttrDict.js");

AnimationEvent = (function() {
  var id, simpleId;

  id = -1;

  simpleId = null;

  function AnimationEvent(target, startValue, endValue, time, duration, bezier) {
    this.target = target;
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
    var args, endVars, obj, obj1, obj2, obj3, startVars;
    if (AttrDict.includes(this.target.name)) {
      startVars = {
        attr: (
          obj = {},
          obj["" + this.target.name] = this.startValue,
          obj
        )
      };
      endVars = {
        attr: (
          obj1 = {},
          obj1["" + this.target.name] = this.endValue,
          obj1
        )
      };
    } else {
      startVars = (
        obj2 = {},
        obj2["{" + this.target.name] = this.startValue,
        obj2
      );
      endVars = (
        obj3 = {},
        obj3["" + this.target.name] = this.endValue,
        obj3
      );
    }
    args = {
      target: this.target.element.id,
      duration: this.duration,
      startVar: startVars,
      endVar: endVars,
      time: this.time,
      bezier: this.bezier
    };
    return args;
  };

  return AnimationEvent;

})();

module.exports = AnimationEvent;
