'use strict'

var dot = require('dot-prop')
var Symbol = require('es6-symbol')
var bind = require('bind-to')

module.exports = EventsTree

var LISTENERS = Symbol('listeners')

function EventsTree () {
  this.tree = {}
}

EventsTree.prototype.at = function at (path) {
  var location = dot.get(this.tree, path)
  if (!location) {
    location = {}
    location[LISTENERS] = []
    dot.set(this.tree, path, location)
  }
  return bind(api, null, location[LISTENERS])
}

var api = {
  get: get,
  add: add,
  clear: clear
}

function get (listeners) {
  return listeners.slice()
}

function add (listeners, listener) {
  listeners.push(listener)
}

function clear (listeners) {
  listeners.length = 0
}
