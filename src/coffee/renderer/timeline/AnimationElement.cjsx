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

  addProp: (prop, react) ->
    if prop instanceof AnimationProperty
      prop.setId(@)
      prop.isRename = true
      #@propList.push prop
      newElem =
        propList:
          "$push": [prop]
      react.props.setParentState react.updateAnimElemList(@id, [newElem], true)
    else
      console.error "#{prop} is not AnimationProperty class"

  deleteProp: (id) ->
    i = 0
    for prop in propList
      if prop.id == id
#        AnimationProperty.deletedPropStack.push prop
        #delete @propList[i]
        newElem =
          propList: []
        newElem.propList[i] =
          "$set": undefined
        react.props.setParentState react.updateAnimElemList(@id, [newElem], true)
      i++

  compile: () ->
    code = ""
    for prop in @propList
      code += prop.compile()
    return code

module.exports = AnimationElement
