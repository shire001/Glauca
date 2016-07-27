AnimationProperty = require "./AnimationProperty.js"
AnimationElement = require "./AnimationElement.js"

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

module.exports = AnimationEvent
