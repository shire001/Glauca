TimelineMax = require("gsap").TimelineMax
AnimationElement = require "./timeline/AnimationElement.js"
AnimationProperty = require "./timeline/AnimationProperty.js"
AnimationEvent = require "./timeline/AnimationEvent.js"
AnimationEventTip = require "./AnimationEventTip.js"
update = require 'react-addons-update'

#e1 = new AnimationElement("e1", document.getElementById "e1")
#e1.addProp new AnimationProperty("opacity", e1, true)
#e1.addProp new AnimationProperty("cx", e1, true)
#e2 = new AnimationElement("e2", document.getElementById "e2")
#e2.addProp new AnimationProperty("opacity", e2, true)
DblClickWaitTime = 300 # msec
IntervalPx = 40 # px
TimeWidth = 30 # px
window.totalTime = 60 # sec

compileAnimation = (elems) ->
  code = "var timeline = new TimelineMax();\n"
  code += "timeline.fromTo('#MainView', #{window.totalTime}, {opacity: 1}, {opacity: 1}, 0)\n"
  for elem in elems
    code += elem.compile()
  window.element = []
  for elem in elems
    window.element[elem.name] = elem.dom
  console.log window.element, code
  eval code
  return code

genClickHandler = (singleFunc, dblFunc) ->
  clicked = false
  handler = (e) ->
    if clicked
      # ダブルクリックイベント発火
      dblFunc e
      return
    #シングルクリック
    clicked = true
    setTimeout(() ->
      if clicked
        #シングルクリックイベント発火
        singleFunc e
        clicked = false
    , DblClickWaitTime)
  return handler

module.exports = React.createClass

  getInitialState: ->
    visibleTime :
      first : 0 # sec
      last : 30 # sec
      pps : 40 # px/sec
      width : 200 # %
    eventTip :
      visible : false
      x : 0 # px
      y : 0 # px
      id : null # AnimationEvent ID

  updateAnimElemList: (targetId, newElems, hasMargeProp = false) ->
    idList = targetId.split "-"
    newState = @props.parentState
    diffState = {}
    diffState.animElemList = []
    i = 0
    tempState = diffState.animElemList
    curAnimList = @props.parentState.animElemList
    for id in idList
      isExist = false
      j = 0
      for animElem in curAnimList
        if animElem.simpleId is id
          if i is (idList.length - 1)
            if hasMargeProp
              for newElem in newElems
                tempState[j] = newElem
                newState = update(newState, diffState)
            else
              for newElem in newElems
                tempState[j] =
                  "$merge": newElem
                newState = update(newState, diffState)
          else
            tempState[j] = {}
            tempState[j].propList = []
            tempState = tempState[j].propList
            curAnimList = animElem.propList
          isExist = true
          break
        j++
      if !isExist
        console.error "Target ID '#{targetId}' is not exist"
        return false
      i++
    newState

  updateAnimEvent: (targetId, newEvents) ->
    idList = targetId.split "-"
    newState = @props.parentState
    diffState = {}
    diffState.animElemList = []
    i = 0
    tempState = diffState.animElemList
    curAnimList = @props.parentState.animElemList
    for id in idList
      isExist = false
      j = 0
      #console.log curAnimList
      for animElem in curAnimList
        if animElem.simpleId is id
          if i is (idList.length - 1)
            for newEvent in newEvents
              tempState[j] =
                "$merge": newEvent
              newState = (update newState, diffState)
          else if i is (idList.length - 2)
            tempState[j] = {}
            tempState[j].eventList = []
            tempState = tempState[j].eventList
            curAnimList = animElem.eventList
          else
            tempState[j] = {}
            tempState[j].propList = []
            tempState = tempState[j].propList
            curAnimList = animElem.propList
          isExist = true
          break
        j++
      if !isExist
        console.error "Target ID '#{targetId}' is not exist"
        return false
      i++
    newState

  getAnimElemById: (idList, element = @props.parentState.animElemList) ->
    if !(idList instanceof Array)
      idList = idList.split "-"
    id = idList.shift()
    if element instanceof AnimationElement or element instanceof AnimationProperty
      element = element.propList
    for e in element
      if e.simpleId is id
        if idList.length > 0
          return @getAnimElemById(idList, e)
        else
          return e

  getAnimEventById: (idList) ->
    if !idList
      return
    if !(idList instanceof Array)
      idList = idList.split "-"
    id = idList.pop()
    elem = @getAnimElemById idList
    for e in elem.eventList
      if e.simpleId is id
        return e
    console.warn "not find #{id} Event"


  onClickElemRename: (e) ->
    elemDom = e.target.parentNode.parentNode
    targetId = elemDom.getAttribute("alt")
    newElem = {}
    newElem.isRename = true
    @props.setParentState @updateAnimElemList(targetId, [newElem])

  renameElement: (e) ->
    elemDom = e.target.parentNode.parentNode
    targetId = elemDom.getAttribute("alt")

    newName = e.target.parentNode.getElementsByClassName("name")[0].value
    newElem = {}
    newElem.name = newName
    newElem.isRename = false
    @props.setParentState @updateAnimElemList(targetId, [newElem])

  onClickAddProp: (e) ->
    elemDom = e.target.parentNode.parentNode
    targetId = elemDom.getAttribute("alt")
    element = @getAnimElemById targetId
    newProp = new AnimationProperty("property#{element.propList.length}", element.dom, true)
    element.addProp(newProp, @)

  genKeyDom: (indent, element) ->
    _this = @
    nameDom = null
    renameDom = null
    if element.isRename
      nameDom = <input className="icon name" type="name" placeholder={element.name} autoFocus="true"></input>
      renameDom = <p className="icon fa fa-check right" aria-hidden="true" onClick={_this.renameElement}/>
    else
      nameDom = <p className="icon name">{element.name}</p>
      renameDom = <p className="icon fa fa-pencil right" aria-hidden="true" onClick={_this.onClickElemRename}/>

    <div className={ if element instanceof AnimationElement then "element" else "prop" } alt={element.id} key={element.id}>
      <div className={ if element.isSelected then "target selected" else "target" }>
        <p className="icon indent" style={width:"#{indent}px"}/>
        <p className={
          if element instanceof AnimationElement
            "icon fa fa-file-text-o"
          else if element.isProperty
            "icon fa fa-sliders"
          else
            "icon fa fa-magic"
          } aria-hidden="true"/>
        {nameDom}
        {renameDom}
        <p className="icon fa fa-plus right" aria-hidden="true" onClick={_this.onClickAddProp}/>
      </div>
      <div className="props">
        {
          element.propList.map (prop) ->
            _this.genKeyDom(indent + 10, prop)
        }
      </div>
    </div>

  onScrollValue: (e) ->
    timeline = document.getElementById "ValueTimeline"
    inner = document.getElementById "ValueTimelineInner"
    x = timeline.scrollLeft
    y = timeline.scrollTop
    newState = @updateVisibleTime()
    if x >= inner.clientWidth - timeline.clientWidth - 50
      newState.visibleTime["$merge"].width = @state.visibleTime.width + 50;
    newState = update(@state, newState)
    @setState newState

  genValueDom: (element) ->
    _this = @
    onSingleClick = (e) ->
      e.persist()
    onDblClick = (e) ->
      e.stopPropagation()
      timelineDom = document.getElementById "ValueTimelineInner"
      timelineRect = timelineDom.getBoundingClientRect()
      x = e.clientX - timelineRect.left
      targetId = e.target.getAttribute "alt"
      targetProp = _this.getAnimElemById targetId
      time = x / _this.state.visibleTime.pps
      newEvent = new AnimationEvent(targetProp, 0, 1, time, 2, null)
      newEvent.setId()
      targetProp.addEvent(newEvent, _this) #FIXME
      console.log e.target, targetId, x, targetProp
    onClick = genClickHandler(onSingleClick, onDblClick)
    <div className={
      if element instanceof AnimationElement
        "value"
      else
        "prop_value"
    } key={element.id} alt={element.id} onClick={onClick}>
      {
        if element instanceof AnimationElement
          <div className="prop_value"/>
        else if element instanceof AnimationProperty
          element.eventList.map (event) ->
            _this.genEventDom(event)
      }
      {
        element.propList.map (prop) ->
          _this.genValueDom(prop)
      }
    </div>

  genTimeStr: (time) ->
    minutes = Math.floor(time / 60)
    seconds = time % 60
    seconds = if seconds < 10 then "0#{seconds}" else seconds
    out = "#{minutes}:#{seconds}"
    return out

  genTimeDoms: () ->
    curtime = @state.visibleTime.first
    last = @state.visibleTime.last
    pps = @state.visibleTime.pps
    reso = IntervalPx / pps

    dom = []
    while curtime <= last
      dom.push <div className="time" style={left:"#{curtime * pps - TimeWidth / 2}px"} key={curtime}>{@genTimeStr curtime}</div>
      curtime += reso
    return dom

  onEventRightClick: (e) ->
    targetId = e.target.parentNode.getAttribute "alt"
    newState =
       visible: true
       x : e.clientX + 5
       y : e.clientY - 110
       id : targetId
    console.log newState
    newState =
      eventTip :
        "$merge" :
          newState
    newState = update(@state, newState)
    @setState newState

  setEventProp: (e) ->
    targetId = e.target.parentNode.parentNode.getAttribute "alt"
    inputDoms = document.querySelectorAll ".event-prop > input"
    newEvent = {}
    newEvent.startValue = inputDoms[0].value
    newEvent.endValue = inputDoms[1].value
    newEvent.duration = inputDoms[2].value
    newState = @updateAnimEvent(targetId, [newEvent])
    @props.setParentState newState
    newState =
      eventTip:
        "$set":
          visible: false
    newState = update(@state, newState)
    @setState newState

  dragEvent: (e) ->
    targetId = e.target.parentNode.getAttribute "alt"
    targetClass = e.target.classList
    targetEvent = @getAnimEventById targetId
    tlDom = document.getElementById "ValueTimeline"
    x = e.clientX + tlDom.scrollLeft - tlDom.offsetLeft
    time = x / @state.visibleTime.pps
    if(targetClass.contains "start")
      dur = targetEvent.time + targetEvent.duration - time
      newState =
        time: time
        duration: if dur > 0 then dur else 0
    else if(targetClass.contains "end")
      dur = time - targetEvent.time
      newState =
        duration: if dur > 0 then dur else 0
    else
      newState =
        time: time

    newState = @updateAnimEvent(targetId, [newState])
    @props.setParentState newState

  genEventDom: (event)->
    width = 15
    startX = event.time * @state.visibleTime.pps - width / 2
    endX = event.duration * @state.visibleTime.pps
    doms = []
    <div className="event" key={event.id} alt={event.id} style={left:"#{startX}px"} onContextMenu={@onEventRightClick} onDrag={@dragEvent}>
      {
        if event.duration is 0
          <div className="fa fa-circle start" value={event.startValue} style={left:"0px", width:"#{width}px"} key={"#{event.id}-set"} onDrag={@dragEvent}/>
        else
          dom = []
          dom.push <div className="line" style={width:"#{endX - 10}px"} value={event.duration} key={"#{event.id}-line"}/>
          dom.push <div className="fa fa-chevron-circle-right start" value={event.startValue} style={left:"0px", width:"#{width}px"} key={"#{event.id}-start"} onDrag={@dragEvent}/>
          dom.push <div className="fa fa-chevron-circle-left end" value={event.endValue} style={left:"#{endX}px", width:"#{width}px"} key={"#{event.id}-end"} onDrag={@dragEvent}/>
          dom
      }
    </div>

  containElement: (dom) ->
    for animElem in @props.parentState.animElemList
      if animElem.dom is dom
        return true
    return false

  updateElementList: () ->
    elements = (document.querySelector "#MainView>svg").children
    newState = []
    curIndex = @props.parentState.animElemList.length
    for element in elements
      if !(@containElement element)
        newState[curIndex] = new AnimationElement(element.getAttribute("name"), element)
        curIndex++
    newState =
      animElemList:
        "$merge": newState
    return newState

  updateVisibleTime: () ->
    timeline = document.getElementById "ValueTimeline"
    offsetX = timeline.scrollLeft
    width = timeline.clientWidth
    pps = @state.visibleTime.pps
    # 1ウィンドウに何個 Time が入るか
    timeNum = Math.floor(width / pps)
    # 現在のスクロール位置から表示する最初の Time を計算
    firstTime = if(offsetX % pps is 0) then offsetX / pps else Math.floor(offsetX / pps) + 1
    # 1ウィンドウ分 後の Time も含めた作成しておく最後の Time
    lastTime = firstTime + timeNum * 2
    # 1ウィンドウ分 前のTimeも作っておく
    # 1ウィンドウ分 前になければ 0sec からスタート
    firstTime = if(firstTime > timeNum) then firstTime - timeNum else 0

    newState =
      visibleTime:
        "$merge":
          first: firstTime
          last: lastTime
    return newState

  componentDidMount: ()->
    newState = update(@props.parentState, @updateElementList())
    @props.setParentState newState
    newState = update(@state, @updateVisibleTime())
    @setState newState

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
    keyDoms = @props.parentState.animElemList.map (element) ->
      _this.genKeyDom(0, element)

    valueDoms = @props.parentState.animElemList.map (element) ->
      _this.genValueDom(element)

    timeDoms = @genTimeDoms()

    testOnClick = (e) ->
      console.log compileAnimation _this.props.parentState.animElemList

    eventTip = @getAnimEventById @state.eventTip.id

    <div id="Timeline">
      <div id="KeyTimeline">
        <div className="menu" onClick={testOnClick}>
        </div>
        {keyDoms}
      </div>
      {
        if @state.eventTip.visible
          <AnimationEventTip event={eventTip} state={@state.eventTip} onClickButton={@setEventProp}/>
      }
      <div id="ValueTimeline" onScroll={@onScrollValue}>
        <div id="ValueTimelineInner" style={width:"#{@state.visibleTime.width}%"}>
          <div id="Timebar">
            {timeDoms}
          </div>
          {valueDoms}
        </div>
      </div>
      <div className="mousePointView">
      </div>
    </div>
