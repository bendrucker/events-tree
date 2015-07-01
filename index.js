'use strict'

var EventEmitter = require('events').EventEmitter
var dot = require('dot-prop')
var Symbol = require('es6-symbol')

module.exports = EventsTree

var EVENTS = Symbol('events')

function EventsTree () {
  this.tree = {}
}

EventsTree.prototype.node = function node (path) {
  return dot.get(this.tree, path)
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
