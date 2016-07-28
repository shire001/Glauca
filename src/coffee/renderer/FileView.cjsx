React = require 'react'

fs = require 'fs'
remote = require 'remote'
{exec} = remote.require('child_process')
update = require 'react-addons-update'
module.exports = React.createClass
  getInitialState: ->
    files: []
  componentDidMount: ->
  onDropItem: (e) ->
    e.preventDefault()
    e.stopPropagation()
    console.log e.dataTransfer.files?[0]
    targetPath = @props.path
    if e.currentTarget.classList.contains("directory")
      targetPath += e.currentTarget.attributes.value.textContent
    console.log targetPath
    exec "cp \"#{e.dataTransfer.files?[0].path}\" \"#{targetPath}\"", (err) =>
      if err?
        console.log err
      else
      @readDir()

  createFileList: (files, path="", indexes="") ->
    i = 0
    items = files.map (file) =>
      if file.name[0] is "."
        i++
        return null
      cl = "fileview-ele"
      if file.isDirectory
        if file.isLoaded and file.isOpen
          cl += " open"
          inner = @createFileList file.inner, "#{path}#{file.name}/", "#{indexes}#{i}-"
        cl += " directory"
        draggable = false
      else
        draggable = true
      <li key={file.name} onClick={file.onclick} onDrop={@onDropItem} draggable={draggable}
          className={cl} value="#{path}#{file.name}" alt="#{indexes}#{i++}">
        <i className={file.className}/> {file.name}
        {inner}
      </li>
    <ul className="fileview" onDrop={@onDropItem}>{items}</ul>
  readDir: (path=@props.path, cb=((files) => @setState files: files)) ->
    fs.readdir path, (err, ret) =>
      files = []
      for file in ret
        f = {}
        f.name = file
        f.isDirectory = fs.statSync("#{path}#{file}").isDirectory()
        if f.isDirectory
          f.className = "fa fa-folder"
          f.onclick = ((n) => ((e) =>
            e.stopPropagation()
            target = e.target
            target = target.parentNode while not target.classList.contains("fileview-ele")
            indexes = target.attributes.alt.textContent.split("-")
            currentTarget = @state.files
            currentTarget_inner = currentTarget
            diff = {}
            cur_inner = diff
            for i in indexes
              currentTarget = currentTarget_inner[i]
              currentTarget_inner = currentTarget.inner
              cur = cur_inner[i] = {}
              cur_inner = cur.inner = {}
            if currentTarget?.isOpen
              delete cur.inner
              cur["$merge"] = {isOpen: false}
              newFiles = update @state.files, diff
              @setState files: newFiles
            else
              p = e.currentTarget.attributes.value.textContent
              # addr = address.concat([n])
              @readDir "#{@props.path}#{p}/", ((c, d) => ((inner) =>
                # alt = {}
                # cur = alt
                # i = 0
                # while i < addr.length - 1
                #   cur = cur[addr[i]] = {}
                #   cur = cur.inner = {}
                #   i++
                # cur[addr[addr.length - 1]] = {$merge: {inner: inner, isLoaded: true}}
                delete c.inner
                c["$merge"] = {inner: inner, isLoaded: true, isOpen: true}
                newFiles = update @state.files, d
                @setState files: newFiles))(cur, diff)
            ))(files.length)
        else
          f.className = "fa fa-file-o"
          f.onclick = (e) =>
            selected = {}
            selected.path = @props.path + e.currentTarget.attributes.getNamedItem("value")?.value
            selected.name = selected.path.split("/").pop()
            console.log selected
            @props.Action.setProperty "file", selected
        files.push f
      cb files
  render: ->
    if @props.path? and @state.files.length < 1
      @readDir()
    items = @createFileList @state.files
    <div id="FileView" onDrop={@onDropItem}>
      {items}
    </div>
