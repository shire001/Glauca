var AnimationElement, AnimationEvent, AnimationProperty, TimelineMax, TweenMax;

TimelineMax = require("../../vendor/gsap/uncompressed/TimelineMax.js");

TweenMax = require("../../vendor/gsap/uncompressed/TweenMax.js");

module.exports = React.createClass({
  getInitialState: function() {
    return {
      animElemList: [new AnimationElement("e1", document.getElementById("e1")), new AnimationElement("e2", document.getElementById("e2"))]
    };
  },
  render: function() {
    var keyDoms, onClick;
    onClick = function() {
      var e1, e2, e3, tl;
      e1 = document.getElementById("e1");
      e2 = document.getElementById("e2");
      e3 = document.getElementById("e3");
      tl = new TimelineMax();
      console.log(e1, e2, e3);
      return tl.to("#e1", 1, {
        opacity: 0,
        repeat: 10
      }, 0).to("#e1", 2, {
        attr: {
          cx: 200
        }
      }, 0).to("#e1", 1, {
        attr: {
          cx: 100,
          cy: 300
        }
      }, 0).to("#e1", 1, {
        attr: {
          cy: 50
        }
      }, 1).to('#e3', 1, {
        scaleX: 2
      }, tl.recent().endTime());
    };
    keyDoms = this.state.animElemList.map(function(element) {
      return React.createElement("div", {
        "className": "element",
        "value": element.id
      }, React.createElement("div", {
        "className": "target"
      }, React.createElement("p", {
        "className": "fa fa-file-text-o",
        "aria-hidden": "true"
      }), React.createElement("p", {
        "className": "name"
      }, element.name)), React.createElement("div", null));
    });
    return React.createElement("div", {
      "id": "Timeline",
      "onClick": onClick
    }, React.createElement("div", {
      "id": "KeyTimeline"
    }, keyDoms), React.createElement("div", {
      "id": "ValueTimeline"
    }));
  }
});

AnimationElement = (function() {
  var dom, id, isLoad, name, propList;

  AnimationElement.curId = 0;

  id = AnimationElement.curId++;

  name = null;

  dom = null;

  propList = [];

  isLoad = false;

  function AnimationElement(name1, dom1) {
    this.name = name1;
    this.dom = dom1;
  }

  AnimationElement.prototype.addProp = function(prop) {
    if (prop instanceof AnimationProperty) {
      prop.id = this.propList.length;
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

AnimationProperty = (function() {
  var eventList, id, isLoad, isProperty, name, propList, target;

  id = -1;

  name = null;

  target = null;

  propList = [];

  eventList = [];

  isProperty = false;

  isLoad = false;

  function AnimationProperty(name1, target1, isProperty1) {
    this.name = name1;
    this.target = target1;
    this.isProperty = isProperty1;
  }

  AnimationProperty.prototype.addEvent = function(event) {
    if (event instanceof AnimationEvent) {
      event.id = this.eventList.length;
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
