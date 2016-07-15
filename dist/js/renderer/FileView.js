module.exports = React.createClass({
  render: function() {
    var ondrop;
    ondrop = function(e) {
      var ref, ref1;
      e.preventDefault();
      console.log((ref = e.dataTransfer.files) != null ? ref[0] : void 0);
      return (ref1 = e.dataTransfer.files) != null ? ref1[0] : void 0;
    };
    return React.createElement("div", {
      "id": "FileView",
      "onDrop": ondrop
    });
  }
});
