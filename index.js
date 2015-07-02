'use strict'

var EventEmitter = require('events').EventEmitter
var dot = require('dot-prop')
var Symbol = require('es6-symbol')
var traverse = require('traverse')

module.exports = EventsTree

var EVENTS = Symbol('events')

function EventsTree () {
  if (!(this instanceof EventsTree)) return new EventsTree()
  this.tree = {}
}

EventsTree.prototype.node = function node (path) {
  return path ? dot.get(this.tree, path) : this.tree
}

EventsTree.prototype.at = function at (path) {
  var node = this.node(path)
  if (!node) {
    node = {}
    dot.set(this.tree, path, node)
  }
  if (!node[EVENTS]) {
    node[EVENTS] = new EventEmitter()
  }
  return node[EVENTS]
}

EventsTree.prototype.root = function root () {
  return this.at()
}

EventsTree.prototype.below = function (path, callback) {
  if (typeof path === 'function') {
    callback = path
    path = ''
  }

  var node = this.node(path)
  if (!hasChildren(node)) return

  traverse(node).forEach(function eachNode (node) {
    var state = this
    var emitter = node[EVENTS]
    if (!emitter) return
    var currentPath = (path ? [path] : []).concat(state.path).join('.')
    callback(currentPath, emitter)
  })
}

EventsTree.prototype.above = function (path, callback) {
  if (typeof path === 'function' || !path) return
  var parts = path.split('.')
  parts.pop()
  for (var i = parts.length; i >= 0; i--) {
    var currentPath = parts.slice(0, i).join('.')
    var node = this.node(currentPath)
    var emitter = node[EVENTS]
    if (!emitter) continue
    callback(currentPath, emitter)
  }
}

function hasChildren (node) {
  return node && !!Object.keys(node).length
}
