document.ondragover = document.ondrop = (e) ->
  e.preventDefault()
  false

window.onload = () ->
  remote = require('electron').remote
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
      animElemList: []
    componentDidMount: ->
      ipcRenderer.on 'requestPath-reply', (err, path) =>
        console.log err if err?
        console.log path
        @setState projectPath: path
      ipcRenderer.send 'requestPath-message', ''

      ipcRenderer.on 'capture', (err, type) =>
        console.log type

    updateState: (newState) ->
      @setState newState

    render: () ->
      return (
        <div id="Contents">
          <MainView path={@state.projectPath} />
          <FileView path={@state.projectPath} Action={setProperty: @setProperty}/>
          <PropertyView type={@state.type}, item={@state.item}/>
          <Timeline parentState={@state} animElemList={@state.animElemList} setParentState={@updateState}/>
        </div>
      )
  ReactDOM.render(
    <Contents />
    document.getElementById 'Top'
  )
