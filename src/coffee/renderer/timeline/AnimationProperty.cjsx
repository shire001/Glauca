AnimationElement = require "./AnimationElement.js"
AnimationEvent = require "./AnimationEvent.js"

class AnimationProperty
#  @deletedPropStack

  constructor: (@name, @target, @isProperty = false) ->
    @id = null;
    @propList = []
    @eventList = []
    @isLoad = false

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

  genKeyDom: (indent, renameProp) ->
    <div className="prop" dir={@id}>
      <div className="target">
        <p className="indent" width={indent + "px"}/>
        <p className={
          if @isProperty
            "fa fa-sliders"
          else
            "fa fa-magic"
          } aria-hidden="true"/>
        <p className="name">{@name}</p>
        <p className="fa fa-pencil" aria-hidden="true" onClick={renameProp}/>
      </div>
      <div className="props">
        {@propList.map (prop) -> prop.genKeyDom(indent + 10)}
      </div>
    </div>

  genValueDom: () ->
    <div className="prop_value" value={@id}>
      {
        @propList.map (prop) ->
          prop.genValueDom()
      }
    </div>

module.exports = AnimationProperty
