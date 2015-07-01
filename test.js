'use strict'

var test = require('tape')
var Tree = require('./')

test('node', function (t) {
  t.plan(3)
  var tree = new Tree()
  var node = tree.at('foo.bar')
  t.equal(node, tree.at('foo.bar'))
  t.ok(node.emit)
  function fn (a) {
    t.equal(a, 1)
  }
  node.on('e', fn)
  node.emit('e', 1)
})
