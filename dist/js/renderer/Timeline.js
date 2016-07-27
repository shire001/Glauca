var AnimationElement, AnimationProperty, TimelineMax, TweenMax, e1, e2, update;

TimelineMax = require("../../vendor/gsap/uncompressed/TimelineMax.js");

TweenMax = require("../../vendor/gsap/uncompressed/TweenMax.js");

AnimationElement = require("./timeline/AnimationElement.js");

AnimationProperty = require("./timeline/AnimationProperty.js");

update = require('react-addons-update');

e1 = new AnimationElement("e1", document.getElementById("e1"));

e1.addProp(new AnimationProperty("opacity", e1, true));

e1.addProp(new AnimationProperty("cx", e1, true));

e2 = new AnimationElement("e2", document.getElementById("e2"));

e2.addProp(new AnimationProperty("opacity", e2, true));

module.exports = React.createClass({
  getInitialState: function() {
    return {
      animElemList: [e1, e2]
    };
  },
  renameElement: function(e) {
    var elem, elemDom, i, j, len, newElem, newName, newState, ref, targetId;
    elemDom = e.target.parentNode.parentNode;
    targetId = +elemDom.getAttribute("dir");
    newState = [];
    i = 0;
    newName = "(*_*)";
    ref = this.state.animElemList;
    for (j = 0, len = ref.length; j < len; j++) {
      elem = ref[j];
      if (elem.id === targetId) {
        newElem = elem;
        newElem.name = newName;
        newState[i] = newElem;
        newState = {
          "$merge": newState
        };
        newState = update(this.state.animElemList, newState);
      }
      i++;
    }
    return this.setState(newState);
  },
  renameProp: function(e) {
    var element, id;
    element = e.target.parentNode.parentNode;
    id = element.getAttribute("dir");
    return console.log(id);
  },
  render: function() {
    var _this, keyDoms, onClick, valueDoms;
    onClick = function() {
      var e3, tl;
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
    _this = this;
    keyDoms = this.state.animElemList.map(function(element) {
      return element.genKeyDom(_this.renameElement, _this.renameProp);
    });
    valueDoms = this.state.animElemList.map(function(element) {
      return element.genValueDom();
    });
    return React.createElement("div", {
      "id": "Timeline"
    }, React.createElement("div", {
      "id": "KeyTimeline"
    }, React.createElement("div", {
      "className": "menu"
    }), keyDoms), React.createElement("div", {
      "id": "ValueTimeline"
    }, valueDoms));
  }
});
