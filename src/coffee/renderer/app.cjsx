window.onload = () ->
  remote = require 'remote'
  React = require 'react'
  ReactDOM = require 'react-dom'
  MainView = React.createClass
    render: ->
      <div id="MainView">
        <svg></svg>
      </div>
  FileView = React.createClass
    render: ->
      <div id="FileView"></div>
  FxView = React.createClass
    render: ->
      <div id="FxView"></div>
  Timeline = React.createClass
    render: ->
      <div id="Timeline"></div>
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
