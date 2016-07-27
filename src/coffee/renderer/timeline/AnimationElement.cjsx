AnimationProperty = require "./AnimationProperty.js"
AnimationEvent = require "./AnimationEvent.js"

class AnimationElement
  # static field 通し番号
  @curId = 0

  constructor: (@name, @dom) ->
    @id = AnimationElement.curId++
    @propList = []
    @isLoad = false

  addProp: (prop) ->
    if prop instanceof AnimationProperty
      prop.id = "#{@id}-#{@propList.length}"
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

  genKeyDom: (renameElement, renameProp) ->
    <div className="element" dir={@id}>
      <div className="target">
        <p className="fa fa-file-text-o" aria-hidden="true"/>
        <p className="name">{@name}</p>
        <p className="fa fa-pencil" aria-hidden="true" onClick={renameElement}/>
      </div>
      <div className="props">
        {
          @propList.map (prop) ->
            prop.genKeyDom(10, renameProp)
        }
      </div>
    </div>

  genValueDom: () ->
    <div className="value">
      <div className="prop_value">
      </div>
      {
        @propList.map (prop) ->
          prop.genValueDom()
      }
    </div>

module.exports = AnimationElement
