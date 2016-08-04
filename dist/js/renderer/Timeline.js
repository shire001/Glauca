var AnimationElement, AnimationProperty, TimelineMax, e1, e2, update;

TimelineMax = require("../../vendor/gsap/uncompressed/TimelineMax.js");

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
  onClickElemRename: function(e) {
    var elem, elemDom, i, j, len, newElem, newState, ref, targetId;
    elemDom = e.target.parentNode.parentNode;
    targetId = elemDom.getAttribute("dir");
    newState = {};
    i = 0;
    ref = this.state.animElemList;
    for (j = 0, len = ref.length; j < len; j++) {
      elem = ref[j];
      if (elem.id === targetId) {
        newElem = {};
        newElem.isRename = true;
        newState[i] = {
          "$merge": newElem
        };
        newState = {
          animElemList: newState
        };
        newState = update(this.state, newState);
      }
      i++;
    }
    return this.setState(newState);
  },
  renameElement: function(e) {
    var elem, elemDom, i, j, len, newElem, newName, newState, ref, targetId;
    elemDom = e.target.parentNode.parentNode;
    targetId = elemDom.getAttribute("dir");
    newState = [];
    i = 0;
    newName = e.target.parentNode.getElementsByClassName("name")[0].value;
    ref = this.state.animElemList;
    for (j = 0, len = ref.length; j < len; j++) {
      elem = ref[j];
      if (elem.id === targetId) {
        newElem = {};
        newElem.name = newName;
        newElem.isRename = false;
        newState[i] = {
          "$merge": newElem
        };
        newState = {
          animElemList: newState
        };
        newState = update(this.state, newState);
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
  genKeyDom: function(indent, element) {
    var _this, nameDom, renameDom;
    _this = this;
    nameDom = null;
    renameDom = null;
    if (element.isRename) {
      nameDom = React.createElement("input", {
        "className": "name",
        "type": "name",
        "placeholder": element.name,
        "autoFocus": "true"
      });
      renameDom = React.createElement("p", {
        "className": "fa fa-check right",
        "aria-hidden": "true",
        "onClick": _this.renameElement
      });
    } else {
      nameDom = React.createElement("p", {
        "className": "name"
      }, element.name);
      renameDom = React.createElement("p", {
        "className": "fa fa-pencil right",
        "aria-hidden": "true",
        "onClick": _this.onClickElemRename
      });
    }
    return React.createElement("div", {
      "className": (element instanceof AnimationElement ? "element" : "prop"),
      "dir": element.id,
      "key": element.id
    }, React.createElement("div", {
      "className": (element.isSelected ? "target selected" : "target")
    }, React.createElement("p", {
      "className": "indent",
      "style": {
        width: indent + "px"
      }
    }), React.createElement("p", {
      "className": (element instanceof AnimationElement ? "fa fa-file-text-o" : element.isProperty ? "fa fa-sliders" : "fa fa-magic"),
      "aria-hidden": "true"
    }), nameDom, renameDom), React.createElement("div", {
      "className": "props"
    }, element.propList.map(function(prop) {
      return _this.genKeyDom(indent + 10, prop);
    })));
  },
  genElementValueDom: function(element) {
    var _this;
    _this = this;
    return React.createElement("div", {
      "className": "value",
      "key": element.id
    }, React.createElement("div", {
      "className": "prop_value"
    }), element.propList.map(function(prop) {
      return _this.genPropValueDom(prop);
    }));
  },
  genPropValueDom: function(prop) {
    var _this;
    _this = this;
    return React.createElement("div", {
      "className": "prop_value",
      "key": prop.id
    }, prop.propList.map(function(p) {
      return _this.genPropValueDom(p);
    }));
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
      return _this.genKeyDom(0, element);
    });
    valueDoms = this.state.animElemList.map(function(element) {
      return _this.genElementValueDom(element);
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
