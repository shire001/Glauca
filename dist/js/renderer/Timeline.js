var TimelineMax, TweenMax;

TimelineMax = require("../../vendor/gsap/uncompressed/TimelineMax.js");

TweenMax = require("../../vendor/gsap/uncompressed/TweenMax.js");

module.exports = React.createClass({
  getInitialState: function() {
    return {
      keyList: [],
      valueList: []
    };
  },
  render: function() {
    var onClick;
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
    return React.createElement("div", {
      "id": "Timeline",
      "onClick": onClick
    }, React.createElement("div", {
      "id": "KeyTimeline"
    }), React.createElement("div", {
      "id": "ValueTimeline"
    }));
  }
});
