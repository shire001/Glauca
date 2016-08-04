TimelineMax = require("gsap").TimelineMax
AnimationElement = require "./timeline/AnimationElement.js"
AnimationProperty = require "./timeline/AnimationProperty.js"
update = require 'react-addons-update'

e1 = new AnimationElement("e1", document.getElementById "e1")
e1.addProp new AnimationProperty("opacity", e1, true)
e1.addProp new AnimationProperty("cx", e1, true)
e2 = new AnimationElement("e2", document.getElementById "e2")
e2.addProp new AnimationProperty("opacity", e2, true)

module.exports = React.createClass
  getInitialState: ->
    animElemList : [
      e1,
      e2
    ]

  onClickElemRename: (e) ->
    elemDom = e.target.parentNode.parentNode
    targetId = elemDom.getAttribute("dir")
    # console.log targetId
    newState = {}
    i = 0
    for elem in @state.animElemList
      if elem.id is targetId
        newElem = {}
        newElem.isRename = true
        newState[i] =
          "$merge": newElem
        newState =
          animElemList: newState
        newState = (update @state, newState)
      i++
    @setState newState

  getElementById: (idList, element) ->
    if !(idList instanceof Array)
      idList = idList.split "-"
    id = idList.shift()
    if element instanceof AnimationElement or element instanceof AnimationProperty
      element = element.propList
    for e of element
      if e.simpleId is id
        if idList.length > 0
          return @getElementById(idList, e)
        else
          return e

  renameElement: (e) ->
    elemDom = e.target.parentNode.parentNode
    targetId = elemDom.getAttribute("dir")
    newState = []
    i = 0
    newName = e.target.parentNode.getElementsByClassName("name")[0].value
    for elem in @state.animElemList
      if elem.id is targetId
        newElem = {}
        newElem.name = newName
        newElem.isRename = false
        newState[i] =
          "$merge": newElem
        newState =
          animElemList: newState
        newState = (update @state, newState)
      i++
    @setState newState

  renameProp: (e) ->
    element = e.target.parentNode.parentNode
    id = element.getAttribute("dir")
    console.log id
    #TODO

  genKeyDom: (indent, element) ->
    _this = @
    nameDom = null
    renameDom = null
    if element.isRename
      nameDom = <input className="name" type="name" placeholder={element.name} autoFocus="true"></input>
      renameDom = <p className="fa fa-check right" aria-hidden="true" onClick={_this.renameElement}/>
    else
      nameDom = <p className="name">{element.name}</p>
      renameDom = <p className="fa fa-pencil right" aria-hidden="true" onClick={_this.onClickElemRename}/>

    <div className={ if element instanceof AnimationElement then "element" else "prop" } dir={element.id} key={element.id}>
      <div className={ if element.isSelected then "target selected" else "target" }>
        <p className="indent" style={width:"#{indent}px"}/>
        <p className={
          if element instanceof AnimationElement
            "fa fa-file-text-o"
          else if element.isProperty
            "fa fa-sliders"
          else
            "fa fa-magic"
          } aria-hidden="true"/>
        {nameDom}
        {renameDom}
      </div>
      <div className="props">
        {
          element.propList.map (prop) ->
            _this.genKeyDom(indent + 10, prop)
        }
      </div>
    </div>

  genElementValueDom: (element) ->
    _this = @
    <div className="value" key={element.id}>
      <div className="prop_value">
      </div>
      {
        element.propList.map (prop) ->
          _this.genPropValueDom(prop)
      }
    </div>

  genPropValueDom: (prop) ->
    _this = @
    <div className="prop_value" key={prop.id}>
      {
        prop.propList.map (p) ->
          _this.genPropValueDom(p)
      }
    </div>

  render: ->
    onClick = ->
      e1 = document.getElementById("e1")
      e2 = document.getElementById("e2")
      e3 = document.getElementById("e3")
      tl = new TimelineMax()
      console.log e1,e2,e3
      tl.to("#e1", 1, {opacity:0, repeat:10}, 0)
        .to("#e1", 2, {attr:{cx:200}}, 0)
        .to("#e1", 1, {attr:{cx:100, cy:300}}, 0)
        .to("#e1", 1, {attr:{cy:50}}, 1)
        .to('#e3', 1, {scaleX:2}, tl.recent().endTime())

    _this = @
    keyDoms = @state.animElemList.map (element) ->
      _this.genKeyDom(0, element)

    valueDoms = @state.animElemList.map (element) ->
      _this.genElementValueDom(element)

    <div id="Timeline" onClick={onClick}>
      <div id="KeyTimeline">
        <div className="menu">
        </div>
        {keyDoms}
      </div>
      <div id="ValueTimeline">
        {valueDoms}
      </div>
    </div>
