React = require 'react'
module.exports = React.createClass
  render: ->
    <ul id="FilePropertyView">
      <li>{"name: #{@props.item.name}"}</li>
      <li className="property-image">
        <img src={@props.item.path} width="100%" />
      </li>
    </ul>
