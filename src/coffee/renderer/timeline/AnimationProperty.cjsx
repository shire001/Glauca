AnimationElement = require "./AnimationElement.js"
AnimationEvent = require "./AnimationEvent.js"

class AnimationProperty
#  @deletedPropStack

  constructor: (@name, @element, @isProperty = false) ->
    @id = null;
    @propList = []
    @eventList = []
    @isOpen = false
    @isSelected = false

  setId: (parent) ->
    @simpleId = "#{parent.propList.length}"
    @id = "#{parent.id}-#{@simpleId}"

  addEvent: (event, react) ->
    if event instanceof AnimationEvent
      newElem =
        eventList:
          "$push": [event]
      react.props.setParentState react.updateAnimElemList(@id, [newElem], true)
    else
      console.error "#{event} is not AnimationEvent class"

  deleteEvent: (id) ->
    i = 0
    for event in @eventList
      if @eventList[i].id == id
        delete @eventList[i]
      i++

  compile: () ->
    insts = []
    for prop in @propList
      insts = insts.concat prop.compile()
    for event in @eventList
      insts.push event.compile()
    return insts

module.exports = AnimationProperty
