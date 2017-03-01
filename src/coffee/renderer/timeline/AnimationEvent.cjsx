AnimationProperty = require "./AnimationProperty.js"
AnimationElement = require "./AnimationElement.js"
AttrDict = require "../AttrDict.js"

class AnimationEvent
  id = -1
  simpleId = null

  constructor: (@target, @startValue, @endValue, @time, @duration, @bezier) ->

  setId: () ->
    @id = "#{@target.id}-e#{@target.eventList.length}"
    @simpleId = "e#{@target.eventList.length}"

  compile: () ->
    if AttrDict.includes @target.name
      startVars = attr: {"#{@target.name}": @startValue}
      endVars = attr: {"#{@target.name}": @endValue}
    else
      startVars = "{#{@target.name}": @startValue
      endVars = "#{@target.name}": @endValue
    args =
      target: @target.element.id
      duration: @duration
      startVar: startVars
      endVar: endVars
      time: @time
      bezier: @bezier
    return args

module.exports = AnimationEvent
