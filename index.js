'use strict'

var EventEmitter = require('events').EventEmitter
var dot = require('dot-prop')
var Symbol = require('es6-symbol')

module.exports = EventsTree

var EVENTS = Symbol('events')

function EventsTree () {
  this.tree = {}
}

EventsTree.prototype.at = function at (path) {
  var node = dot.get(this.tree, path)
  if (!node) {
    node = {}
    dot.set(this.tree, path, node)
  }
  if (!node[EVENTS]) {
    node[EVENTS] = new EventEmitter()
  }
  return node[EVENTS]
}
