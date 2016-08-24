React = require 'react'
update = require 'react-addons-update'
AnimationElement = require "./timeline/AnimationElement.js"
AnimationProperty = require "./timeline/AnimationProperty.js"
AnimationEvent = require "./timeline/AnimationEvent.js"

module.exports = React.createClass
  getInitialState: ->
    items: []
  onDropItem: (e) ->
    e.preventDefault()
    e.stopPropagation()
    image = new Image()
    path = e.dataTransfer.getData("text")
    image.src = "#{@props.path}#{path}"
    x = e.nativeEvent.offsetX
    y = e.nativeEvent.offsetY
    image.onload = =>
      item =
        path: path
        x: x - image.width/2
        y: y - image.height/2
        height: image.height
        width: image.width
        animElem: null
      @props.Action.addAnimElem @createNewAnimElem item
      @setState items: @state.items.concat(item)
      console.log @props.path, path
  createNewAnimElem: (item) ->
    newElem = new AnimationElement(item.path)
    item.animElem = newElem
    for prop in ["x", "y", "height", "width"]
      newProp = new AnimationProperty(prop, newElem, true)
      newProp.setId newElem
      newEvent = new AnimationEvent(newProp, item[prop], item[prop], 0, 0, null)
      newEvent.setId()
      newProp.eventList.push newEvent
      newElem.propList.push newProp
    return newElem
  render: ->
    items = @state.items.map (item) =>
      <image xlinkHref={"#{@props.path}#{item.path}"} x={item.x} y={item.y} height={item.height} width={item.width} id={"AnimationElement##{item.animElem.id}"} key={"AnimationElement#{item.animElem.id}"}/>
    <div id="MainView" onDrop={@onDropItem}>
      <svg>
        {items}
      </svg>
    </div>
