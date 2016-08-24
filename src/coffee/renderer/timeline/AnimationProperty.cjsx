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
    code = ""
    for prop in @propList
      code += prop.compile()
    for event in @eventList
      code += event.compile()
    return code

module.exports = AnimationProperty
