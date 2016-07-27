TimelineMax = require "../../vendor/gsap/uncompressed/TimelineMax.js"
TweenMax = require "../../vendor/gsap/uncompressed/TweenMax.js"
module.exports = React.createClass
  getInitialState: ->
    animElemList : [
      new AnimationElement("e1", document.getElementById "e1"),
      new AnimationElement("e2", document.getElementById "e2")
    ]
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

    keyDoms = @state.animElemList.map (element) ->
      <div className="element" value={element.id}>
        <div className="target">
          <p className="fa fa-file-text-o" aria-hidden="true"/>
          <p className="name">{element.name}</p>
        </div>
        <div>
        </div>
      </div>

    <div id="Timeline" onClick = {onClick}>
      <div id="KeyTimeline">
        {keyDoms}
      </div>
      <div id="ValueTimeline"></div>
    </div>

class AnimationElement
  @curId = 0
  id = AnimationElement.curId++
  name = null
  dom = null
  propList = []
  isLoad = false

  constructor: (@name, @dom) ->

  addProp: (prop) ->
    if prop instanceof AnimationProperty
      prop.id = @propList.length
      @propList.push prop
    else
      console.error "#{prop} is not AnimationProperty class"

  deleteProp: (id) ->
    i = 0
    for prop in propList
      if prop.id == id
#        AnimationProperty.deletedPropStack.push prop
        delete @propList[i]
      i++

class AnimationProperty
#  @deletedPropStack
  id = -1
  name = null
  target = null
  propList = []
  eventList = []
  isProperty = false
  isLoad = false

  constructor: (@name, @target, @isProperty) ->

  addEvent: (event) ->
    if event instanceof AnimationEvent
      event.id = @eventList.length
      eventList.push event
    else
      console.error "#{event} is not AnimationEvent class"

  deleteEvent: (id) ->
    i = 0
    for event in @eventList
      if @eventList[i].id == id
        delete @eventList[i]
      i++

class AnimationEvent
  id = -1
  name = null
  target = null
  time = 0
  startValue = null
  endValue = null
  bezier = null
  duration = 0

  constructor: (@target, @name, @startValue, @endValue, @time, @duration, @bezier) ->
