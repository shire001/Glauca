update = require 'react-addons-update'

module.exports = React.createClass
  getInitialState: ->
    input : {
      start : @props.event.startValue
      end : @props.event.endValue
      duration : @props.event.duration
    }

  changeInput: (e) ->
    newState =
      input :
        "$merge" :
          "#{e.target.getAttribute "alt"}": e.target.value
    newState = update @state, newState
    @setState newState

  componentDidMount: () ->
#    inputDoms = document.querySelectorAll ".event-prop > input"
#    console.log inputDoms
#    inputDoms[0].setAttribute("value", @props.event.startValue)
#    inputDoms[1].setAttribute("value", @props.event.endValue)
#    inputDoms[2].setAttribute("value", @props.event.duration)

  render: () ->
    <div className="event-tip" alt={@props.event.id} style={left:"#{@props.state.x}px", top:"#{@props.state.y}px"}>
      <div className="event-prop">
        <p>Start</p>
        <input className="" type="name" alt="start" value={@state.input.start} onChange={@changeInput}></input>
      </div>
      <div className="event-prop">
        <p>End</p>
        <input className="" type="name" alt="end" value={@state.input.end} onChange={@changeInput}></input>
      </div>
      <div className="event-prop">
        <p>Duration</p>
        <input className="" type="name" alt="duration" value={@state.input.duration} onChange={@changeInput}></input>
      </div>
      <div className="event-prop">
        <button onClick={@props.onClickButton}>
          <p className="fa fa-check-circle" aria-hidden="true"></p>
        </button>
      </div>
    </div>
