React = require 'react'

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
      @setState items: @state.items.concat(item)
      console.log @props.path, path
  render: ->
    items = @state.items.map (item) =>
      <image xlinkHref={"#{@props.path}#{item.path}"} x={item.x} y={item.y} height={item.height} width={item.width} />
    <div id="MainView" onDrop={@onDropItem}>
      <svg>
        <circle name="e1" cx="50" cy="50" r="50" stroke="blue" fill="white" strokeWidth="5"/>
        <circle name="e2" cx="150" cy="50" r="50" stroke="red" fill="white" strokeWidth="5"/>
        <circle name="e3" cx="250" cy="50" r="50" stroke="green" fill="white" strokeWidth="5"/>
        {items}
      </svg>
    </div>
