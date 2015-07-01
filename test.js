'use strict'

var test = require('tape')
var Tree = require('./')

test('at', function (t) {
  t.plan(3)
  var tree = new Tree()
  var node = tree.at('foo.bar')
  t.equal(node, tree.at('foo.bar'))
  t.ok(node.emit)
  node.on('e', function (a) {
    t.equal(a, 1)
  })
  node.emit('e', 1)
})
