window.onload = () ->
  remote = require 'remote'
  React = require 'react'
  ReactDOM = require 'react-dom'
  MainView = require './js/renderer/MainView'
  FileView = require './js/renderer/FileView'
  FxView = require './js/renderer/FxView'
  Timeline = require './js/renderer/Timeline'
  Contents = React.createClass
    render: () ->
      return (
        <div id="Contents">
          <MainView />
          <FileView />
          <FxView />
          <Timeline />
        </div>
      )
  ReactDOM.render(
    <Contents />
    document.getElementById 'Top'
  )
