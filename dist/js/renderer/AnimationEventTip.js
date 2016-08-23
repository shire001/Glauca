var update;

update = require('react-addons-update');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      input: {
        start: this.props.event.startValue,
        end: this.props.event.endValue,
        duration: this.props.event.duration
      }
    };
  },
  changeInput: function(e) {
    var newState, obj;
    newState = {
      input: {
        "$merge": (
          obj = {},
          obj["" + (e.target.getAttribute("alt"))] = e.target.value,
          obj
        )
      }
    };
    newState = update(this.state, newState);
    return this.setState(newState);
  },
  componentDidMount: function() {},
  render: function() {
    return React.createElement("div", {
      "className": "event-tip",
      "alt": this.props.event.id,
      "style": {
        left: this.props.state.x + "px",
        top: this.props.state.y + "px"
      }
    }, React.createElement("div", {
      "className": "event-prop"
    }, React.createElement("p", null, "Start"), React.createElement("input", {
      "className": "",
      "type": "name",
      "alt": "start",
      "value": this.state.input.start,
      "onChange": this.changeInput
    })), React.createElement("div", {
      "className": "event-prop"
    }, React.createElement("p", null, "End"), React.createElement("input", {
      "className": "",
      "type": "name",
      "alt": "end",
      "value": this.state.input.end,
      "onChange": this.changeInput
    })), React.createElement("div", {
      "className": "event-prop"
    }, React.createElement("p", null, "Duration"), React.createElement("input", {
      "className": "",
      "type": "name",
      "alt": "duration",
      "value": this.state.input.duration,
      "onChange": this.changeInput
    })), React.createElement("div", {
      "className": "event-prop"
    }, React.createElement("button", {
      "onClick": this.props.onClickButton
    }, React.createElement("p", {
      "className": "fa fa-check-circle",
      "aria-hidden": "true"
    }))));
  }
});
