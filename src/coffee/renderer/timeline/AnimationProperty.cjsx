AnimationElement = require "./AnimationElement.js"
AnimationEvent = require "./AnimationEvent.js"

class AnimationProperty
#  @deletedPropStack

  constructor: (@name, @target, @isProperty = false) ->
    @id = null;
    @propList = []
    @eventList = []
    @isOpen = false
    @isSelected = false

  addEvent: (event) ->
    if event instanceof AnimationEvent
      event.id = "#{@id}-#{@eventList.length}"
      eventList.push event
    else
      console.error "#{event} is not AnimationEvent class"

  deleteEvent: (id) ->
    i = 0
    for event in @eventList
      if @eventList[i].id == id
        delete @eventList[i]
      i++



module.exports = AnimationProperty
