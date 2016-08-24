var AnimationElement, AnimationEvent, AnimationEventTip, AnimationProperty, DblClickWaitTime, IntervalPx, TimeWidth, TimelineMax, compileAnimation, genClickHandler, update;

TimelineMax = require("gsap").TimelineMax;

AnimationElement = require("./timeline/AnimationElement.js");

AnimationProperty = require("./timeline/AnimationProperty.js");

AnimationEvent = require("./timeline/AnimationEvent.js");

AnimationEventTip = require("./AnimationEventTip.js");

update = require('react-addons-update');

DblClickWaitTime = 300;

IntervalPx = 40;

TimeWidth = 30;

window.totalTime = 60;

compileAnimation = function(elems) {
  var code, elem, k, l, len, len1;
  code = "var timeline = new TimelineMax();\n";
  code += "timeline.fromTo('#MainView', " + window.totalTime + ", {opacity: 1}, {opacity: 1}, 0)\n";
  for (k = 0, len = elems.length; k < len; k++) {
    elem = elems[k];
    code += elem.compile();
  }
  window.element = [];
  for (l = 0, len1 = elems.length; l < len1; l++) {
    elem = elems[l];
    window.element[elem.name] = elem.dom;
  }
  console.log(window.element, code);
  eval(code);
  return code;
};

genClickHandler = function(singleFunc, dblFunc) {
  var clicked, handler;
  clicked = false;
  handler = function(e) {
    if (clicked) {
      dblFunc(e);
      return;
    }
    clicked = true;
    return setTimeout(function() {
      if (clicked) {
        singleFunc(e);
        return clicked = false;
      }
    }, DblClickWaitTime);
  };
  return handler;
};

module.exports = React.createClass({
  getInitialState: function() {
    return {
      visibleTime: {
        first: 0,
        last: 30,
        pps: 40,
        width: 200
      },
      eventTip: {
        visible: false,
        x: 0,
        y: 0,
        id: null
      }
    };
  },
  updateAnimElemList: function(targetId, newElems, hasMargeProp) {
    var animElem, curAnimList, diffState, i, id, idList, isExist, j, k, l, len, len1, len2, len3, m, n, newElem, newState, tempState;
    if (hasMargeProp == null) {
      hasMargeProp = false;
    }
    idList = targetId.split("-");
    newState = this.props.parentState;
    diffState = {};
    diffState.animElemList = [];
    i = 0;
    tempState = diffState.animElemList;
    curAnimList = this.props.parentState.animElemList;
    for (k = 0, len = idList.length; k < len; k++) {
      id = idList[k];
      isExist = false;
      j = 0;
      for (l = 0, len1 = curAnimList.length; l < len1; l++) {
        animElem = curAnimList[l];
        if (animElem.simpleId === id) {
          if (i === (idList.length - 1)) {
            if (hasMargeProp) {
              for (m = 0, len2 = newElems.length; m < len2; m++) {
                newElem = newElems[m];
                tempState[j] = newElem;
                newState = update(newState, diffState);
              }
            } else {
              for (n = 0, len3 = newElems.length; n < len3; n++) {
                newElem = newElems[n];
                tempState[j] = {
                  "$merge": newElem
                };
                newState = update(newState, diffState);
              }
            }
          } else {
            tempState[j] = {};
            tempState[j].propList = [];
            tempState = tempState[j].propList;
            curAnimList = animElem.propList;
          }
          isExist = true;
          break;
        }
        j++;
      }
      if (!isExist) {
        console.error("Target ID '" + targetId + "' is not exist");
        return false;
      }
      i++;
    }
    return newState;
  },
  updateAnimEvent: function(targetId, newEvents) {
    var animElem, curAnimList, diffState, i, id, idList, isExist, j, k, l, len, len1, len2, m, newEvent, newState, tempState;
    idList = targetId.split("-");
    newState = this.props.parentState;
    diffState = {};
    diffState.animElemList = [];
    i = 0;
    tempState = diffState.animElemList;
    curAnimList = this.props.parentState.animElemList;
    for (k = 0, len = idList.length; k < len; k++) {
      id = idList[k];
      isExist = false;
      j = 0;
      for (l = 0, len1 = curAnimList.length; l < len1; l++) {
        animElem = curAnimList[l];
        if (animElem.simpleId === id) {
          if (i === (idList.length - 1)) {
            for (m = 0, len2 = newEvents.length; m < len2; m++) {
              newEvent = newEvents[m];
              tempState[j] = {
                "$merge": newEvent
              };
              newState = update(newState, diffState);
            }
          } else if (i === (idList.length - 2)) {
            tempState[j] = {};
            tempState[j].eventList = [];
            tempState = tempState[j].eventList;
            curAnimList = animElem.eventList;
          } else {
            tempState[j] = {};
            tempState[j].propList = [];
            tempState = tempState[j].propList;
            curAnimList = animElem.propList;
          }
          isExist = true;
          break;
        }
        j++;
      }
      if (!isExist) {
        console.error("Target ID '" + targetId + "' is not exist");
        return false;
      }
      i++;
    }
    return newState;
  },
  getAnimElemById: function(idList, element) {
    var e, id, k, len;
    if (element == null) {
      element = this.props.parentState.animElemList;
    }
    if (!(idList instanceof Array)) {
      idList = idList.split("-");
    }
    id = idList.shift();
    if (element instanceof AnimationElement || element instanceof AnimationProperty) {
      element = element.propList;
    }
    for (k = 0, len = element.length; k < len; k++) {
      e = element[k];
      if (e.simpleId === id) {
        if (idList.length > 0) {
          return this.getAnimElemById(idList, e);
        } else {
          return e;
        }
      }
    }
  },
  getAnimEventById: function(idList) {
    var e, elem, id, k, len, ref;
    if (!idList) {
      return;
    }
    if (!(idList instanceof Array)) {
      idList = idList.split("-");
    }
    id = idList.pop();
    elem = this.getAnimElemById(idList);
    ref = elem.eventList;
    for (k = 0, len = ref.length; k < len; k++) {
      e = ref[k];
      if (e.simpleId === id) {
        return e;
      }
    }
    return console.warn("not find " + id + " Event");
  },
  onClickElemRename: function(e) {
    var elemDom, newElem, targetId;
    elemDom = e.target.parentNode.parentNode;
    targetId = elemDom.getAttribute("alt");
    newElem = {};
    newElem.isRename = true;
    return this.props.setParentState(this.updateAnimElemList(targetId, [newElem]));
  },
  renameElement: function(e) {
    var elemDom, newElem, newName, targetId;
    elemDom = e.target.parentNode.parentNode;
    targetId = elemDom.getAttribute("alt");
    newName = e.target.parentNode.getElementsByClassName("name")[0].value;
    newElem = {};
    newElem.name = newName;
    newElem.isRename = false;
    return this.props.setParentState(this.updateAnimElemList(targetId, [newElem]));
  },
  onClickAddProp: function(e) {
    var elemDom, element, newProp, targetId;
    elemDom = e.target.parentNode.parentNode;
    targetId = elemDom.getAttribute("alt");
    element = this.getAnimElemById(targetId);
    newProp = new AnimationProperty("property" + element.propList.length, element.dom, true);
    return element.addProp(newProp, this);
  },
  genKeyDom: function(indent, element) {
    var _this, nameDom, renameDom;
    _this = this;
    nameDom = null;
    renameDom = null;
    if (element.isRename) {
      nameDom = React.createElement("input", {
        "className": "icon name",
        "type": "name",
        "placeholder": element.name,
        "autoFocus": "true"
      });
      renameDom = React.createElement("p", {
        "className": "icon fa fa-check right",
        "aria-hidden": "true",
        "onClick": _this.renameElement
      });
    } else {
      nameDom = React.createElement("p", {
        "className": "icon name"
      }, element.name);
      renameDom = React.createElement("p", {
        "className": "icon fa fa-pencil right",
        "aria-hidden": "true",
        "onClick": _this.onClickElemRename
      });
    }
    return React.createElement("div", {
      "className": (element instanceof AnimationElement ? "element" : "prop"),
      "alt": element.id,
      "key": element.id
    }, React.createElement("div", {
      "className": (element.isSelected ? "target selected" : "target")
    }, React.createElement("p", {
      "className": "icon indent",
      "style": {
        width: indent + "px"
      }
    }), React.createElement("p", {
      "className": (element instanceof AnimationElement ? "icon fa fa-file-text-o" : element.isProperty ? "icon fa fa-sliders" : "icon fa fa-magic"),
      "aria-hidden": "true"
    }), nameDom, renameDom, React.createElement("p", {
      "className": "icon fa fa-plus right",
      "aria-hidden": "true",
      "onClick": _this.onClickAddProp
    })), React.createElement("div", {
      "className": "props"
    }, element.propList.map(function(prop) {
      return _this.genKeyDom(indent + 10, prop);
    })));
  },
  onScrollValue: function(e) {
    var inner, newState, timeline, x, y;
    timeline = document.getElementById("ValueTimeline");
    inner = document.getElementById("ValueTimelineInner");
    x = timeline.scrollLeft;
    y = timeline.scrollTop;
    newState = this.updateVisibleTime();
    if (x >= inner.clientWidth - timeline.clientWidth - 50) {
      newState.visibleTime["$merge"].width = this.state.visibleTime.width + 50;
    }
    newState = update(this.state, newState);
    return this.setState(newState);
  },
  genValueDom: function(element) {
    var _this, onClick, onDblClick, onSingleClick;
    _this = this;
    onSingleClick = function(e) {
      return e.persist();
    };
    onDblClick = function(e) {
      var newEvent, targetId, targetProp, time, timelineDom, timelineRect, x;
      e.stopPropagation();
      timelineDom = document.getElementById("ValueTimelineInner");
      timelineRect = timelineDom.getBoundingClientRect();
      x = e.clientX - timelineRect.left;
      targetId = e.target.getAttribute("alt");
      targetProp = _this.getAnimElemById(targetId);
      time = x / _this.state.visibleTime.pps;
      newEvent = new AnimationEvent(targetProp, 0, 1, time, 2, null);
      newEvent.setId();
      targetProp.addEvent(newEvent, _this);
      return console.log(e.target, targetId, x, targetProp);
    };
    onClick = genClickHandler(onSingleClick, onDblClick);
    return React.createElement("div", {
      "className": (element instanceof AnimationElement ? "value" : "prop_value"),
      "key": element.id,
      "alt": element.id,
      "onClick": onClick
    }, (element instanceof AnimationElement ? React.createElement("div", {
      "className": "prop_value"
    }) : element instanceof AnimationProperty ? element.eventList.map(function(event) {
      return _this.genEventDom(event);
    }) : void 0), element.propList.map(function(prop) {
      return _this.genValueDom(prop);
    }));
  },
  genTimeStr: function(time) {
    var minutes, out, seconds;
    minutes = Math.floor(time / 60);
    seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    out = minutes + ":" + seconds;
    return out;
  },
  genTimeDoms: function() {
    var curtime, dom, last, pps, reso;
    curtime = this.state.visibleTime.first;
    last = this.state.visibleTime.last;
    pps = this.state.visibleTime.pps;
    reso = IntervalPx / pps;
    dom = [];
    while (curtime <= last) {
      dom.push(React.createElement("div", {
        "className": "time",
        "style": {
          left: (curtime * pps - TimeWidth / 2) + "px"
        },
        "key": curtime
      }, this.genTimeStr(curtime)));
      curtime += reso;
    }
    return dom;
  },
  onEventRightClick: function(e) {
    var newState, targetId;
    targetId = e.target.parentNode.getAttribute("alt");
    newState = {
      visible: true,
      x: e.clientX + 5,
      y: e.clientY - 110,
      id: targetId
    };
    console.log(newState);
    newState = {
      eventTip: {
        "$merge": newState
      }
    };
    newState = update(this.state, newState);
    return this.setState(newState);
  },
  setEventProp: function(e) {
    var inputDoms, newEvent, newState, targetId;
    targetId = e.target.parentNode.parentNode.getAttribute("alt");
    inputDoms = document.querySelectorAll(".event-prop > input");
    newEvent = {};
    newEvent.startValue = inputDoms[0].value;
    newEvent.endValue = inputDoms[1].value;
    newEvent.duration = inputDoms[2].value;
    newState = this.updateAnimEvent(targetId, [newEvent]);
    this.props.setParentState(newState);
    newState = {
      eventTip: {
        "$set": {
          visible: false
        }
      }
    };
    newState = update(this.state, newState);
    return this.setState(newState);
  },
  dragEvent: function(e) {
    var dur, newState, targetClass, targetEvent, targetId, time, tlDom, x;
    targetId = e.target.parentNode.getAttribute("alt");
    targetClass = e.target.classList;
    targetEvent = this.getAnimEventById(targetId);
    tlDom = document.getElementById("ValueTimeline");
    x = e.clientX + tlDom.scrollLeft - tlDom.offsetLeft;
    time = x / this.state.visibleTime.pps;
    if (targetClass.contains("start")) {
      dur = targetEvent.time + targetEvent.duration - time;
      newState = {
        time: time,
        duration: dur > 0 ? dur : 0
      };
    } else if (targetClass.contains("end")) {
      dur = time - targetEvent.time;
      newState = {
        duration: dur > 0 ? dur : 0
      };
    } else {
      newState = {
        time: time
      };
    }
    newState = this.updateAnimEvent(targetId, [newState]);
    return this.props.setParentState(newState);
  },
  genEventDom: function(event) {
    var dom, doms, endX, startX, width;
    width = 15;
    startX = event.time * this.state.visibleTime.pps - width / 2;
    endX = event.duration * this.state.visibleTime.pps;
    doms = [];
    return React.createElement("div", {
      "className": "event",
      "key": event.id,
      "alt": event.id,
      "style": {
        left: startX + "px"
      },
      "onContextMenu": this.onEventRightClick,
      "onDrag": this.dragEvent
    }, (event.duration === 0 ? React.createElement("div", {
      "className": "fa fa-circle start",
      "value": event.startValue,
      "style": {
        left: "0px",
        width: width + "px"
      },
      "key": event.id + "-set",
      "onDrag": this.dragEvent
    }) : (dom = [], dom.push(React.createElement("div", {
      "className": "line",
      "style": {
        width: (endX - 10) + "px"
      },
      "value": event.duration,
      "key": event.id + "-line"
    })), dom.push(React.createElement("div", {
      "className": "fa fa-chevron-circle-right start",
      "value": event.startValue,
      "style": {
        left: "0px",
        width: width + "px"
      },
      "key": event.id + "-start",
      "onDrag": this.dragEvent
    })), dom.push(React.createElement("div", {
      "className": "fa fa-chevron-circle-left end",
      "value": event.endValue,
      "style": {
        left: endX + "px",
        width: width + "px"
      },
      "key": event.id + "-end",
      "onDrag": this.dragEvent
    })), dom)));
  },
  containElement: function(dom) {
    var animElem, k, len, ref;
    ref = this.props.parentState.animElemList;
    for (k = 0, len = ref.length; k < len; k++) {
      animElem = ref[k];
      if (animElem.dom === dom) {
        return true;
      }
    }
    return false;
  },
  updateElementList: function() {
    var curIndex, element, elements, k, len, newState;
    elements = (document.querySelector("#MainView>svg")).children;
    newState = [];
    curIndex = this.props.parentState.animElemList.length;
    for (k = 0, len = elements.length; k < len; k++) {
      element = elements[k];
      if (!(this.containElement(element))) {
        newState[curIndex] = new AnimationElement(element.getAttribute("name"), element);
        curIndex++;
      }
    }
    newState = {
      animElemList: {
        "$merge": newState
      }
    };
    return newState;
  },
  updateVisibleTime: function() {
    var firstTime, lastTime, newState, offsetX, pps, timeNum, timeline, width;
    timeline = document.getElementById("ValueTimeline");
    offsetX = timeline.scrollLeft;
    width = timeline.clientWidth;
    pps = this.state.visibleTime.pps;
    timeNum = Math.floor(width / pps);
    firstTime = offsetX % pps === 0 ? offsetX / pps : Math.floor(offsetX / pps) + 1;
    lastTime = firstTime + timeNum * 2;
    firstTime = firstTime > timeNum ? firstTime - timeNum : 0;
    newState = {
      visibleTime: {
        "$merge": {
          first: firstTime,
          last: lastTime
        }
      }
    };
    return newState;
  },
  componentDidMount: function() {
    var newState;
    newState = update(this.props.parentState, this.updateElementList());
    this.props.setParentState(newState);
    newState = update(this.state, this.updateVisibleTime());
    return this.setState(newState);
  },
  render: function() {
    var _this, eventTip, keyDoms, onClick, testOnClick, timeDoms, valueDoms;
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
    _this = this;
    keyDoms = this.props.parentState.animElemList.map(function(element) {
      return _this.genKeyDom(0, element);
    });
    valueDoms = this.props.parentState.animElemList.map(function(element) {
      return _this.genValueDom(element);
    });
    timeDoms = this.genTimeDoms();
    testOnClick = function(e) {
      return console.log(compileAnimation(_this.props.parentState.animElemList));
    };
    eventTip = this.getAnimEventById(this.state.eventTip.id);
    return React.createElement("div", {
      "id": "Timeline"
    }, React.createElement("div", {
      "id": "KeyTimeline"
    }, React.createElement("div", {
      "className": "menu",
      "onClick": testOnClick
    }), keyDoms), (this.state.eventTip.visible ? React.createElement(AnimationEventTip, {
      "event": eventTip,
      "state": this.state.eventTip,
      "onClickButton": this.setEventProp
    }) : void 0), React.createElement("div", {
      "id": "ValueTimeline",
      "onScroll": this.onScrollValue
    }, React.createElement("div", {
      "id": "ValueTimelineInner",
      "style": {
        width: this.state.visibleTime.width + "%"
      }
    }, React.createElement("div", {
      "id": "Timebar"
    }, timeDoms), valueDoms)), React.createElement("div", {
      "className": "mousePointView"
    }));
  }
});
