document.ondragover = document.ondrop = (e) ->
  e.preventDefault()
  false

window.Timeline = null

window.onload = () ->
  update = require 'react-addons-update'
  {ipcRenderer, remote} = require 'electron'
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
      curTime: 0
    componentDidMount: ->
      ipcRenderer.on 'requestPath-reply', (err, path) =>
        console.log err if err?
        console.log path
        @setState projectPath: path
      ipcRenderer.send 'requestPath-message', ''

      ipcRenderer.on 'capture', (err, type) =>
        console.log type

    updateState: (newState, callback) ->
      @setState newState, callback

    addAnimElem: (elem) ->
      newState =
        animElemList:
          "$push": [elem]
      newState = update @state, newState
      @setState newState

    render: () ->
      return (
        <div id="Contents">
          <MainView path={@state.projectPath} Action={setParentState: @updateState, addAnimElem: @addAnimElem}/>
          <FileView path={@state.projectPath} Action={setProperty: @setProperty}/>
          <PropertyView type={@state.type}, item={@state.item}/>
          <Timeline parentState={@state} curTime={@state.curTime} setParentState={@updateState}/>
        </div>
      )
  ReactDOM.render(
    <Contents />
    document.getElementById 'Top'
  )
