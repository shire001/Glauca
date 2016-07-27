var AnimationElement, AnimationEvent, AnimationProperty;

AnimationProperty = require("./AnimationProperty.js");

AnimationElement = require("./AnimationElement.js");

AnimationEvent = (function() {
  var bezier, duration, endValue, id, name, startValue, target, time;

  id = -1;

  name = null;

  target = null;

  time = 0;

  startValue = null;

  endValue = null;

  bezier = null;

  duration = 0;

  function AnimationEvent(target1, name1, startValue1, endValue1, time1, duration1, bezier1) {
    this.target = target1;
    this.name = name1;
    this.startValue = startValue1;
    this.endValue = endValue1;
    this.time = time1;
    this.duration = duration1;
    this.bezier = bezier1;
  }

  return AnimationEvent;

})();

module.exports = AnimationEvent;
