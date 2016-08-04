AnimationProperty = require "./AnimationProperty.js"
AnimationEvent = require "./AnimationEvent.js"

class AnimationElement
  # static field 通し番号
  @curId = 0

  constructor: (@name, @dom) ->
    @id = "#{AnimationElement.curId++}"
    @simpleId = "#{@id}"
    @propList = []
    @isOpen = false
    @isSelected = false

  addProp: (prop) ->
    if prop instanceof AnimationProperty
      prop.setId(@)
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

module.exports = AnimationElement
