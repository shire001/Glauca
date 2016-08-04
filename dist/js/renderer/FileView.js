var React, exec, fs, remote, update;

React = require('react');

fs = require('fs');

remote = require('electron').remote;

exec = remote.require('child_process').exec;

update = require('react-addons-update');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      files: [],
      selected: null
    };
  },
  componentDidMount: function() {},
  onDropItem: function(e) {
    var ref, ref1, targetPath;
    e.preventDefault();
    e.stopPropagation();
    console.log((ref = e.dataTransfer.files) != null ? ref[0] : void 0);
    targetPath = this.props.path;
    if (e.currentTarget.classList.contains("directory")) {
      targetPath += e.currentTarget.attributes.value.textContent;
    }
    console.log(targetPath);
    return exec("cp \"" + ((ref1 = e.dataTransfer.files) != null ? ref1[0].path : void 0) + "\" \"" + targetPath + "\"", (function(_this) {
      return function(err) {
        if (err != null) {
          console.log(err);
        } else {

        }
        return _this.readDir();
      };
    })(this));
  },
  setFiles: function(target, obj) {
    var cur, cur_inner, diff, i, indexes, j, len, newFiles;
    if (Array.isArray(target)) {
      indexes = target;
    } else {
      while (!target.classList.contains("fileview-ele")) {
        target = target.parentNode;
      }
      indexes = target.attributes.alt.textContent.split("-");
    }
    diff = {};
    cur_inner = diff;
    for (j = 0, len = indexes.length; j < len; j++) {
      i = indexes[j];
      cur = cur_inner[i] = {};
      cur_inner = cur.inner = {};
    }
    delete cur.inner;
    cur["$merge"] = obj;
    newFiles = update(this.state.files, diff);
    return this.setState({
      files: newFiles
    });
  },
  createFileList: function(files, path, indexes) {
    var i, items;
    if (path == null) {
      path = "";
    }
    if (indexes == null) {
      indexes = "";
    }
    i = 0;
    items = files.map((function(_this) {
      return function(file) {
        var cl, draggable, inner;
        if (file.name[0] === ".") {
          i++;
          return null;
        }
        cl = "fileview-ele";
        if (_this.state.selected === ("" + path + file.name)) {
          cl += " selected";
        }
        if (file.isDirectory) {
          if (file.isLoaded && file.isOpen) {
            cl += " open";
            inner = _this.createFileList(file.inner, "" + path + file.name + "/", "" + indexes + i + "-");
          }
          cl += " directory";
          draggable = false;
        } else {
          draggable = true;
        }
        return React.createElement("li", {
          "key": file.name,
          "onClick": file.onclick,
          "onDrop": _this.onDropItem,
          "onDragStart": ondrag,
          "draggable": draggable,
          "className": cl,
          "value": "" + path + file.name,
          "alt": "" + indexes + (i++)
        }, React.createElement("i", {
          "className": file.className
        }), " ", file.name, inner);
      };
    })(this));
    return React.createElement("ul", {
      "className": "fileview",
      "onDrop": this.onDropItem
    }, items);
  },
  readDir: function(path, cb) {
    if (path == null) {
      path = this.props.path;
    }
    if (cb == null) {
      cb = ((function(_this) {
        return function(files) {
          return _this.setState({
            files: files
          });
        };
      })(this));
    }
    return fs.readdir(path, (function(_this) {
      return function(err, ret) {
        var f, file, files, j, len;
        files = [];
        for (j = 0, len = ret.length; j < len; j++) {
          file = ret[j];
          f = {};
          f.name = file;
          f.isDirectory = fs.statSync("" + path + file).isDirectory();
          if (f.isDirectory) {
            f.className = "fa fa-folder";
            f.onclick = (function(n) {
              return function(e) {
                var cur, cur_inner, currentTarget, currentTarget_inner, diff, i, indexes, k, len1, newFiles, p, target;
                e.stopPropagation();
                target = e.target;
                while (!target.classList.contains("fileview-ele")) {
                  target = target.parentNode;
                }
                indexes = target.attributes.alt.textContent.split("-");
                currentTarget = _this.state.files;
                currentTarget_inner = currentTarget;
                diff = {};
                cur_inner = diff;
                for (k = 0, len1 = indexes.length; k < len1; k++) {
                  i = indexes[k];
                  currentTarget = currentTarget_inner[i];
                  currentTarget_inner = currentTarget.inner;
                  cur = cur_inner[i] = {};
                  cur_inner = cur.inner = {};
                }
                delete cur.inner;
                if (currentTarget != null ? currentTarget.isOpen : void 0) {
                  cur["$merge"] = {
                    isOpen: false
                  };
                  newFiles = update(_this.state.files, diff);
                  return _this.setState({
                    files: newFiles
                  });
                } else {
                  p = e.currentTarget.attributes.value.textContent;
                  return _this.readDir("" + _this.props.path + p + "/", (function(c, d) {
                    return function(inner) {
                      c["$merge"] = {
                        inner: inner,
                        isLoaded: true,
                        isOpen: true
                      };
                      newFiles = update(_this.state.files, d);
                      return _this.setState({
                        files: newFiles
                      });
                    };
                  })(cur, diff));
                }
              };
            })(files.length);
          } else {
            f.className = "fa fa-file-o";
            f.onclick = function(e) {
              var ref, selected, stat, target;
              selected = {};
              path = (ref = e.currentTarget.attributes.getNamedItem("value")) != null ? ref.value : void 0;
              selected.path = _this.props.path + path;
              selected.name = selected.path.split("/").pop();
              stat = fs.statSync(selected.path);
              selected.size = stat.size;
              console.log(selected);
              target = e.currentTarget;
              _this.props.Action.setProperty("file", selected);
              console.log;
              return _this.setState({
                selected: path
              });
            };
          }
          files.push(f);
        }
        return cb(files);
      };
    })(this));
  },
  render: function() {
    var items;
    if ((this.props.path != null) && this.state.files.length < 1) {
      this.readDir();
    }
    items = this.createFileList(this.state.files);
    return React.createElement("div", {
      "id": "FileView",
      "onDrop": this.onDropItem
    }, items);
  }
});
