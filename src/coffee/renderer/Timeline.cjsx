TimelineMax = require "../../vendor/gsap/uncompressed/TimelineMax.js"
TweenMax = require "../../vendor/gsap/uncompressed/TweenMax.js"
module.exports = React.createClass
  getInitialState: ->
    keyList: []
    valueList: []
  render: ->
    onClick = ->
      e1 = document.getElementById("e1")
      e2 = document.getElementById("e2")
      e3 = document.getElementById("e3")
      tl = new TimelineMax()
      console.log e1,e2,e3
      tl.to("#e1", 1, {opacity:0, repeat:10}, 0)
        .to("#e1", 2, {attr:{cx:200}}, 0)
        .to("#e1", 1, {attr:{cx:100, cy:300}}, 0)
        .to("#e1", 1, {attr:{cy:50}}, 1)
        .to('#e3', 1, {scaleX:2}, tl.recent().endTime())
    <div id="Timeline" onClick = {onClick}>
      <div id="KeyTimeline">
      </div>
      <div id="ValueTimeline"></div>
    </div>
