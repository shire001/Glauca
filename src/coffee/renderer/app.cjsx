document.ondragover = document.ondrop = (e) ->
  e.preventDefault()
  false

window.onload = () ->
  remote = require 'remote'
  {ipcRenderer} = require 'electron'
  React = require 'react'
  ReactDOM = require 'react-dom'
  MainView = require './js/renderer/MainView'
  FileView = require './js/renderer/FileView'
  PropertyView = require './js/renderer/PropertyView'
  Timeline = require './js/renderer/Timeline'
  Contents = React.createClass
    setProperty: (type, item) ->
      @setState type: type, item: item
    getInitialState: ->
      projectPath: null
      type: null
      item: null
    componentDidMount: ->
      ipcRenderer.on 'requestPath-reply', (e, path) =>
        console.log e
        console.log path
        @setState projectPath: path
      ipcRenderer.send 'requestPath-message', ''
    render: () ->
      return (
        <div id="Contents">
          <MainView />
          <FileView path={@state.projectPath} Action={setProperty: @setProperty}/>
          <PropertyView type={@state.type}, item={@state.item}/>
          <Timeline />
        </div>
      )
  ReactDOM.render(
    <Contents />
    document.getElementById 'Top'
  )
