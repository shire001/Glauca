TimelineMax = require "../../vendor/gsap/uncompressed/TimelineMax.js"
TweenMax = require "../../vendor/gsap/uncompressed/TweenMax.js"
AnimationElement = require "./timeline/AnimationElement.js"
AnimationProperty = require "./timeline/AnimationProperty.js"
update = require 'react-addons-update'

e1 = new AnimationElement("e1", document.getElementById "e1")
e1.addProp new AnimationProperty("opacity", e1, true)
e1.addProp new AnimationProperty("cx", e1, true)
e2 = new AnimationElement("e2", document.getElementById "e2")
e2.addProp new AnimationProperty("opacity", e2, true)

module.exports = React.createClass
  getInitialState: ->
    animElemList : [
      e1,
      e2
    ]

  renameElement: (e) ->
    elemDom = e.target.parentNode.parentNode
    targetId = +elemDom.getAttribute("dir")
    newState = []
    i = 0
    newName = "(*_*)"
    for elem in @state.animElemList
      if elem.id is targetId
        newElem = elem
        newElem.name = newName
        newState[i] = newElem
        newState =
          "$merge": newState
        newState = (update @state.animElemList, newState)
      i++
    @setState newState

  renameProp: (e) ->
    element = e.target.parentNode.parentNode
    id = element.getAttribute("dir")
    console.log id

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

    _this = @
    keyDoms = @state.animElemList.map (element) ->
      element.genKeyDom(_this.renameElement, _this.renameProp)

    valueDoms = @state.animElemList.map (element) ->
      element.genValueDom()

    <div id="Timeline">
      <div id="KeyTimeline">
        <div className="menu">
        </div>
        {keyDoms}
      </div>
      <div id="ValueTimeline">
        {valueDoms}
      </div>
    </div>
