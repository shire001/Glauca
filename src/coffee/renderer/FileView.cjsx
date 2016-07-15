module.exports = React.createClass
  render: ->
    ondrop = (e) ->
      e.preventDefault()
      console.log e.dataTransfer.files?[0]
      e.dataTransfer.files?[0]
    <div id="FileView" onDrop={ondrop}></div>
